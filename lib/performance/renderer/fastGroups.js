export const fastGroupFlatten = (group) => {
    if (!group) return group;
    group._objects.forEach((obj) => {
        obj.selectable = false;
        obj.evented = false;
    });
    group.hasBorders = false;
    group.hasControls = false;
    return group;
};
