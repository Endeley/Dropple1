export const patchFabricGroupTransforms = (fabric) => {
    if (!fabric || !fabric.Group) return;

    // Prevent running multiple times
    if (fabric.Group.prototype.__dropplePatched) return;
    fabric.Group.prototype.__dropplePatched = true;

    const originalApplyScaling = fabric.Group.prototype._applyScaling;

    fabric.Group.prototype._applyScaling = function () {
        const scaleX = this.scaleX;
        const scaleY = this.scaleY;

        this._objects.forEach((obj) => {
            obj.scaleX *= scaleX;
            obj.scaleY *= scaleY;
            obj.left *= scaleX;
            obj.top *= scaleY;
            obj.setCoords();
        });

        this.scaleX = 1;
        this.scaleY = 1;

        if (originalApplyScaling) {
            originalApplyScaling.call(this);
        }
    };

    fabric.Group.prototype._applyRotate = function (angle) {
        const rad = fabric.util.degreesToRadians(angle);
        const cx = this.left + this.width / 2;
        const cy = this.top + this.height / 2;

        this._objects.forEach((obj) => {
            const dx = obj.left - cx;
            const dy = obj.top - cy;

            const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
            const ry = dx * Math.sin(rad) + dy * Math.cos(rad);

            obj.set({
                left: cx + rx,
                top: cy + ry,
                angle: (obj.angle || 0) + angle,
            });
            obj.setCoords();
        });

        this.angle = 0;
    };
};
