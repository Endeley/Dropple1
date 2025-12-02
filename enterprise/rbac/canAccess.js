import { ROLE_PERMISSIONS } from './permissions';

export const canAccess = (role, permission) => {
    const perms = ROLE_PERMISSIONS[role];
    if (!perms) return false;
    return perms.includes(permission);
};
