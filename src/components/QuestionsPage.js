import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import User from "./User"
import AnsweredQuestions from "./AnsweredQuestions"

class QuestionsPage extends Component {
    render() {
        const {id, users} = this.props;
        const user = users[id];
        return (
            <div className="col-xs-1" align="center">
                {user === undefined
                ? null
                :
                    <div>
                        <h1> Welcome back {user.name} !</h1>
                        <User id={id}/>
                            { /*console.log(this.props.questions["8xf0y6ziyjabvozdd253nd"].optionOne) */}
                        <AnsweredQuestions />
                </div> }
            </div>
        )
    }
}

function mapStateToProps({users, authedUser, questions}, props) {
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

export default withRouter(connect(mapStateToProps)(QuestionsPage))