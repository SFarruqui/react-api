import React from 'react';
import { useCollapse } from 'react-collapsed';

function Collapsible({ title, children }) {
    // initializing collapse controls and state
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return (
        // main collapsible component wrapper
        <div className="collapsible">
            // clickable header that toggles collapse/expand
            <div className="header" {...getToggleProps()}>
                // shows different text based on collapse state
                {isExpanded ? `Collapse ${title}` : `Expand ${title}`}
            </div>
            // content section that collapses/expands
            <div {...getCollapseProps()}>
                // content container
                <div className="content">
                    {children} // renders children passed to Collapsible component
                </div>
            </div>
        </div>
    );
}

// exporting the Collapsible component for use elsewhere
export default Collapsible;