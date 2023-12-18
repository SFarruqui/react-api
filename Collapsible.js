import React from 'react';
import { useCollapse } from 'react-collapsed';

function Collapsible({ title, children }) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                {isExpanded ? `Collapse ${title}` : `Expand ${title}`}
            </div>
            <div {...getCollapseProps()}>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Collapsible;
