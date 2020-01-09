import React, {Component} from 'react';
import './QuizCreator.scss'
import {Button} from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from '../../form/formFramework'
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import axios from '../../axios/axiosQuiz'

function createOptionControl(num) {
    return createControl({
        label: `Option ${num}`,
            errorMessage: 'Task cant be empty',
            id: num
    }, {required: true})
}
function createFormControls() {
    return {
        question: createControl({
            label: 'Type new task',
            errorMessage: 'Task cant be empty' }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = (e) => {
        e.preventDefault()
    }

    addQuestionHandler = (e) => {
         e.preventDefault()
        const quiz = this.state.quiz.concat()
        const ind = quiz.length + 1;
        const  {option1,option2, option3, option4} = this.state.formControls;
        const questionItem = {
             question: this.state.formControls.question.value,
            id: ind,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id }
            ]
        }
        quiz.push(questionItem)

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 2,
            formControls: createFormControls()
        })
    }

    createQuizHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/quizes.json', this.state.quiz)
            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls()
            })
        } catch (err) {
            console.log(err)
        }
    };

    changeHandler = (value, cName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[cName]}
        control.touched =true
        control.value = value
        control.valid = validate(control.value, control.validation)
        formControls[cName] = control

        this.setState({formControls, isFormValid: validateForm(formControls) })
    };

    renderControls() {
        return Object.keys(this.state.formControls).map((cName, ind) => {
            const control = this.state.formControls[cName];
            return (
                    <Input
                        key={`${cName}-${ind}`}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={ e => this.changeHandler(e.target.value, cName) }
                    />
            )
        })
    }

    selectHandler = (e) => {
        console.log(e.target.value)
        this.setState({rightAnswerId: +e.target.value})
    };

    render() {
        const select = <Select
            label = "Choose right answer"
            value={this.state.rightAnswerId}
            onChange={this.selectHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className="QuizCreator">
               <div>
                   <h1>Create your test</h1>

                   <form onSubmit={this.submitHandler}>
                       {this.renderControls()}
                       {select}
                       <div className="btn-wrapper">
                           <Button type="primary"
                                   disabled={!this.state.isFormValid}
                                   onClick={this.addQuestionHandler}
                           >Add Question</Button>
                           <Button type="success"
                                   disabled={this.state.quiz.length === 0}
                                   onClick={this.createQuizHandler}
                           >Create Test</Button>
                       </div>
                   </form>
               </div>
            </div>
        );
    }
}

export default QuizCreator;
