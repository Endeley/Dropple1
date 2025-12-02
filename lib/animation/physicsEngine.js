function ensurePhysics(obj) {
    if (!obj.physics) {
        obj.physics = {
            enabled: false,
            velocity: { x: 0, y: 0 },
            acceleration: { x: 0, y: 0 },
            gravity: 0,
            friction: 0.1,
            springStrength: 0,
            springTarget: null,
            bounce: 0,
            drag: 0,
            angularVelocity: 0,
            angularFriction: 0.03,
            mass: 1,
        };
    }
}

/**
 * Advance the physics simulation for all objects that have physics enabled.
 * @param {fabric.Canvas} canvas
 * @param {number} deltaMs time delta in milliseconds
 */
export function step(canvas, deltaMs = 16) {
    if (!canvas) return;
    const delta = Math.max(deltaMs, 1) / 1000;

    canvas.getObjects().forEach((obj) => {
        ensurePhysics(obj);
        if (!obj.physics.enabled) return;

        const p = obj.physics;

        // gravity + acceleration
        p.velocity.x += (p.acceleration.x || 0) * delta;
        p.velocity.y += (p.acceleration.y || 0) * delta + (p.gravity || 0) * delta;

        // drag / friction
        p.velocity.x *= 1 - Math.min(Math.max(p.friction || 0, 0), 0.99);
        p.velocity.y *= 1 - Math.min(Math.max(p.friction || 0, 0), 0.99);
        p.velocity.x *= 1 - Math.min(Math.max(p.drag || 0, 0), 0.99);
        p.velocity.y *= 1 - Math.min(Math.max(p.drag || 0, 0), 0.99);

        // spring (very light)
        if (p.springTarget) {
            const dx = p.springTarget.x - (obj.left || 0);
            const dy = p.springTarget.y - (obj.top || 0);
            p.velocity.x += dx * (p.springStrength || 0) * delta;
            p.velocity.y += dy * (p.springStrength || 0) * delta;
        }

        obj.left = (obj.left || 0) + p.velocity.x;
        obj.top = (obj.top || 0) + p.velocity.y;

        // angular inertia
        obj.angle = (obj.angle || 0) + (p.angularVelocity || 0) * delta;
        p.angularVelocity *= 1 - Math.min(Math.max(p.angularFriction || 0, 0), 0.99);

        obj.setCoords?.();
    });

    canvas.requestRenderAll?.();
}

// Simple helper to start a RAF loop when physics is enabled globally.
export function startPhysicsLoop(canvas, stopRef) {
    let last = performance.now();
    const tick = (now) => {
        const delta = now - last;
        last = now;
        step(canvas, delta);

        if (!stopRef.current) {
            stopRef.current = requestAnimationFrame(tick);
        }
    };

    stopRef.current = requestAnimationFrame(tick);
}

export function stopPhysicsLoop(stopRef) {
    if (stopRef.current) {
        cancelAnimationFrame(stopRef.current);
        stopRef.current = null;
    }
}
