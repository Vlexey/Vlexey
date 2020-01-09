import React from 'react';
import './AnswerItem.scss'

const AnswerItem = (props) => {

    const toggleClass = props.state ? `AnswerItem AnswerItem--${props.state}` : 'AnswerItem';

    return (
        <li className={`${toggleClass}`}
            onClick={() => props.onAnswerClickHandler(props.answer.id)}
        >
            {props.answer.text}
        </li>
    );
};

export default AnswerItem;
