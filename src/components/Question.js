import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"

class Question extends Component {
    render() {
        const {id, authedUser, questions} = this.props;
        const question = questions[id];
        return (
            <div>
                {question.optionOne}
            </div>
        )
    }
}

function mapStateToProps({questions, qid, authedUser}) {
    return {
        questions,
        qid,
        authedUser
    }
}

export default withRouter((mapStateToProps)(Question))