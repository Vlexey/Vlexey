import React from 'react';
import './Button.scss'

export const Button = (props, {type, cls}) => {

    const toggleCLS = [
        'Button',
        [props.cls]
    ]

    return (
        <button type={type}
                onClick={props.onClick}
                className={toggleCLS.join(' ')}
                disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};
