'use client';
// /components/editor/ sidebar/ SidebarContainer.jsx
import { useState } from 'react';
import SidebarPrimary from './SidebarPrimary';
import SidebarFlyout from './SidebarFlyout';
import { FLYOUT_MAP } from './config';

export default function SidebarContainer() {
    const [hoveredTool, setHoveredTool] = useState(null);

    // Define flyout categories for each tool
    const categories = hoveredTool ? FLYOUT_MAP[hoveredTool] : null;

    return (
        <div className='relative h-full w-[88px]'>
            {/* MAIN SIDEBAR */}
            <SidebarPrimary onHoverTool={setHoveredTool} />

            {/* FLYOUT MENU */}
            <SidebarFlyout visible={!!hoveredTool && !!categories} toolId={hoveredTool} categories={categories ?? []} />
        </div>
    );
}
