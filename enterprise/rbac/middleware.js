import { canAccess } from './canAccess';

export const requirePermission = (permission) => (req, res, next) => {
    const role = req.user?.orgRole;
    if (!role || !canAccess(role, permission)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};
