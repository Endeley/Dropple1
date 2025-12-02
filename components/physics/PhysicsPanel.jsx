"use client";

import { useState } from "react";
import { createPhysicsWorld2D, stepWorld2D } from "@/lib/physics/core/physicsWorld2D";
import { createRigidBody2D } from "@/lib/physics/bodies/rigidBody2D";
import { createSpringConstraint } from "@/lib/physics/constraints/springConstraint";

export default function PhysicsPanel() {
  const [world, setWorld] = useState(createPhysicsWorld2D({ gravity: [0, -9.81] }));

  const addBody = () => {
    const body = createRigidBody2D({ shape: "box", mass: 1, position: [Math.random(), Math.random()] });
    setWorld((w) => ({ ...w, bodies: [...w.bodies, body] }));
  };

  const addSpring = () => {
    if (world.bodies.length < 2) return;
    const [a, b] = world.bodies.slice(-2);
    const spring = createSpringConstraint({ bodyA: a.id, bodyB: b.id, restLength: 1 });
    setWorld((w) => ({ ...w, constraints: [...w.constraints, spring] }));
  };

  const step = () => {
    setWorld((w) => stepWorld2D(w, 1 / 60));
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Physics Engine</h3>
        <div className="flex gap-2">
          <button
            onClick={addBody}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Add Body
          </button>
          <button
            onClick={addSpring}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Add Spring
          </button>
          <button
            onClick={step}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Step
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs text-white/60">2D world placeholder with bodies and springs.</p>
      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {JSON.stringify(world, null, 2)}
      </pre>
    </div>
  );
}
