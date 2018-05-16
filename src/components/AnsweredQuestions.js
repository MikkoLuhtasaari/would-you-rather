import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import User from "./User"
import Question from "./Question"
import Button from '@material-ui/core/Button';

class AnsweredQuestions extends Component {

    navigateToUnanswered = (e, id) => {
        e.preventDefault();
        this.props.history.push(`/unansweredquestions/${id}`)
    };

    navigate = itemProps => <Button
        onClick={(e) => this.navigateToUnanswered(e, this.props.id)} {...itemProps} />;

    render() {
        const {questions, authedUser, id, users} = this.props;
        const user = users[id];

        let answered = [];
        for (let key in questions) {
            for (let i = 0; i < questions[key].optionOne["votes"].length; i++) {
                if (questions[key].optionOne["votes"][i].toString().toLowerCase() === authedUser["id"].toString().toLowerCase()) {
                    answered = answered.concat(questions[key])
                }
            }
            for (let i = 0; i < questions[key].optionTwo["votes"].length; i++) {
                if (questions[key].optionTwo["votes"][i].toString().toLowerCase() === authedUser["id"].toString().toLowerCase()) {
                    answered = answered.concat(questions[key])
                }
            }
        }
        answered.sort((a, b) => b.timestamp - a.timestamp);
        console.log(answered);
        return (
            <div style={{paddingTop: 2 + "em"}} align="center">
                {user === undefined
                    ? null
                    : <div>
                        <h1> Welcome back !</h1>
                        <User id={id}/>
                        <Button component={this.navigate} color="primary" variant="raised">To Unanswered</Button>
                        <h2>AnsweredQuestions</h2>
                        <ul className="no-bullets">
                            {answered.map((question) => (
                                <li key={question["id"]}>
                                    <div>
                                        <Question id={question["id"]} isAnswered={true}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>}
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, props) {
    const {id} = props.match.params;
    const {user} = users[id];
    return {
        id,
        user,
        authedUser,
        questions,
        users
    }
}

export default withRouter(connect(mapStateToProps)(AnsweredQuestions))