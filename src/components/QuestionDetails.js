import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import User from "./User"
    
class QuestionDetails extends Component {
    render(){
        const {question, authedUser} = this.props;
        console.log(question);
        return (
            <div>
                <h1> Welcome back !</h1>
                <User id={authedUser}/>
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser}, props) {
    const id = props.match.params.id;
    const question = questions[id];
    return {
        question,
        authedUser
    }
}
    
export default withRouter(connect(mapStateToProps)(QuestionDetails))