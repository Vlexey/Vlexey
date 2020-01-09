import React, {Component} from 'react';
import './QuizList.scss'
import {NavLink} from "react-router-dom";
import axios from '../../axios/axiosQuiz'
import Loader from "../../components/UI/Loader/Loader";


class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    }

    renderQuizes ()  {
        return this.state.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        Test {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }
    async componentDidMount() {
        try {
            const res = await axios.get('/quizes.json');
            const quizes = []
            Object.keys(res.data).forEach((key, ind) => {
                quizes.push({
                    id: key,
                    name: `№${ind + 1}`
                })
            })
            this.setState({quizes, loading: false})
        } catch (e) {
            console.log(e)
        }

    }

    render() {
        return (
            <div className="QuizList">
                <div>

                    <h1>Tests List</h1>
                    { this.state.loading
                        ? <Loader/>
                        :
                        <ul>
                            {this.renderQuizes()}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

export default QuizList;