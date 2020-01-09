import React, {Component} from 'react';
import './Quiz.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axiosQuiz'
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    }

    async componentDidMount() {
        try {
            const res = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = res.data;
            this.setState({
                quiz,
                loading: false
            });
        } catch (e) {
            console.log(e)
        }
    }

    onAnswerClickHandler = (id) => {
        if (this.state.answerState) {
            const  key = Object.keys(this.state.answerState)
            if (this.state.answerState[key] == 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if(question.rightAnswerId === id) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState(({
                answerState: {[id]: 'success'},
                results
            }))

            const timeout = window.setTimeout(() => {
                if(this.isQuizFinish()) {
                    this.setState({isFinished: true})

                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 2000)

        } else {
            results[question.id] = "error"
            this.setState(({
                answerState: {[id]: 'error'},
                results
            }))

            const timeout = window.setTimeout(() => {
                this.setState({
                    answerState: null
                })

            }, 2000)
        }
    }
    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            isFinished: false,
            answerState: null,
            results: {}
        })
    }
    isQuizFinish () {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }


    render() {
        return (
            <div className="Quiz">
                <div className="Quiz__wrapper">
                    {
                        this.state.results ?
                            <h1>Answer The Questions</h1>
                            :
                            <h1>Your Result</h1>
                    }

                    {
                        this.state.loading
                            ?  <Loader/>
                            : this.state.isFinished
                            ?
                            <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onReTry={this.retryHandler}
                            />
                            :
                            <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                                        question={this.state.quiz[this.state.activeQuestion].question}
                                        onAnswerClickHandler={this.onAnswerClickHandler}
                                        quizLength={this.state.quiz.length}
                                        answerNumber={this.state.activeQuestion + 1}
                                        state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        );
    }
}

export default Quiz;