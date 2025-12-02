"use client";

import { useEffect, useState } from 'react';

export const useTeamPermissions = (teamId) => {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        if (!teamId) return;
        fetch(`/api/teams/permissions?id=${teamId}`)
            .then((res) => res.json())
            .then(setPermissions);
    }, [teamId]);

    return permissions;
};
