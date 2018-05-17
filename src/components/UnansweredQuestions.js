import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import User from "./User"
import Question from "./Question"
import Button from '@material-ui/core/Button';

class UnansweredQuestions extends Component {

    navigateToAnswered = (e, authedUser) => {
        e.preventDefault();
        this.props.history.push(`/answeredquestions/${authedUser}`)
    };

    navigate = itemProps => <Button
        onClick={(e) => this.navigateToAnswered(e, this.props.authedUser)} {...itemProps} />;

    render() {
        const {users, authedUser, questions} = this.props;
        const user = users[authedUser];

        let unanswered = [];
        for (let key in questions) {
            let isAnswered = false;
            for (let i = 0; i < questions[key].optionOne["votes"].length; i++) {
                if (questions[key].optionOne["votes"][i].toString().toLowerCase() === authedUser.toString().toLowerCase()) {
                    isAnswered = true;
                }
            }
            for (let i = 0; i < questions[key].optionTwo["votes"].length; i++) {
                if (questions[key].optionTwo["votes"][i].toString().toLowerCase() === authedUser.toString().toLowerCase()) {
                    isAnswered = true;
                }
            }

            if(!isAnswered) {
                unanswered = unanswered.concat(questions[key]);
            }
        }
        unanswered.sort((a, b) => b.timestamp - a.timestamp);
        console.log(unanswered);


        return (
            <div align="center">
                {user === undefined
                    ? null
                    :
                    <div>
                        <h1> Welcome back !</h1>
                        <User id={authedUser}/>
                        <div><Button component={this.navigate} color="secondary" variant="raised">To Answered</Button>
                            <h2>UnansweredQuestions</h2>
                            <ul className="no-bullets">
                                {unanswered.map((question) => (
                                    <li key={question["id"]}>
                                        <div>
                                            <Question id={question["id"]} isAnswered={false}/>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>}
            </div>
        )
    }
}

function mapStateToProps({users, authedUser, questions}, props) {
    return {
        authedUser,
        questions,
        users
    }
}

export default withRouter(connect(mapStateToProps)(UnansweredQuestions))