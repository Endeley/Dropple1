'use client';
import { useState, useCallback } from 'react';

export function useSidebarLogic() {
    // which main tool is hovered
    const [hoveredTool, setHoveredTool] = useState(null);

    // which tool's flyout is visible
    const [flyoutOpenFor, setFlyoutOpenFor] = useState(null);

    // which full panel is open (e.g. "templates", "styles", "shapes", etc)
    const [activePanel, setActivePanel] = useState(null);

    // close all panels
    const closeAll = useCallback(() => {
        setHoveredTool(null);
        setFlyoutOpenFor(null);
        setActivePanel(null);
    }, []);

    // show flyout when hovering a main tool
    const openFlyout = useCallback((toolId) => {
        setHoveredTool(toolId);
        setFlyoutOpenFor(toolId);
    }, []);

    // open full panel when clicking a flyout item
    const openPanel = useCallback((panelId) => {
        setActivePanel(panelId);
    }, []);

    return {
        hoveredTool,
        flyoutOpenFor,
        activePanel,
        openFlyout,
        openPanel,
        closeAll,
    };
}
