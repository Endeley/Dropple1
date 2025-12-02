export const PERMISSIONS = {
    MANAGE_USERS: 'manage_users',
    VIEW_BILLING: 'view_billing',
    EDIT_PROJECT: 'edit_project',
    DELETE_PROJECT: 'delete_project',
    EXPORT: 'export',
    ADMIN_PANEL: 'admin_panel',
    VIEW_AUDIT_LOGS: 'view_audit_logs',
};

export const ROLE_PERMISSIONS = {
    owner: [
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.VIEW_BILLING,
        PERMISSIONS.EDIT_PROJECT,
        PERMISSIONS.DELETE_PROJECT,
        PERMISSIONS.ADMIN_PANEL,
        PERMISSIONS.VIEW_AUDIT_LOGS,
        PERMISSIONS.EXPORT,
    ],
    admin: [
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.ADMIN_PANEL,
        PERMISSIONS.EDIT_PROJECT,
        PERMISSIONS.VIEW_AUDIT_LOGS,
    ],
    billing_admin: [PERMISSIONS.VIEW_BILLING, PERMISSIONS.ADMIN_PANEL],
    security_admin: [PERMISSIONS.ADMIN_PANEL, PERMISSIONS.VIEW_AUDIT_LOGS],
    member: [PERMISSIONS.EDIT_PROJECT, PERMISSIONS.EXPORT],
    viewer: [],
};
