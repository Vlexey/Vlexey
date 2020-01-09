import React from 'react';
import './MenuToggle.sass'

const MenuToggle = ({isOpen, onToggleManuHandler}) => {



    const toggleClass = isOpen
        ?
        'toggleHamburger toggleHamburger__animx isActive'
        :
        'toggleHamburger toggleHamburger__animx'

    return (
        <div className="MenuToggle">
            <button className={`${toggleClass}`}
                    onClick={() => onToggleManuHandler()}
            >
                <span>menu toggle</span>
            </button>
        </div>
    );
};

export default MenuToggle;
