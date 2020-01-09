import React from 'react';

import './AnswersList.scss'
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) => {

    return (
        <ul className='AnswersList'>
            { props.answers.map((answer, i) => {
                return (
                    <AnswerItem answer={answer}
                                key={i}
                                onAnswerClickHandler={props.onAnswerClickHandler}
                                state={props.state ? props.state[answer.id] : null }
                    />
                )
            }) }
        </ul>
    );
};

export default AnswersList;
