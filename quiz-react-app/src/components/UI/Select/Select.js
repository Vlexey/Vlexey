import React from 'react';
import './Select.scss'
const Select = (props) => {
    const htmlFor = `${props.label}-${Math.random() * 28}`
    return (
        <div className="Select">
            <label htmlFor={htmlFor}>{props.label}</label>

            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                { props.options.map((option, ind)=> {
                    return (
                        <option value={option.value}
                                key={option.value + ind}
                        >{option.text}</option>
                    )
                }) }
            </select>

        </div>
    );
};

export default Select;
