import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import User from "./User"
import Button from '@material-ui/core/Button';

class UnansweredQuestions extends Component {

    navigateToAnswered = (e, id) => {
        e.preventDefault();
        this.props.history.push(`/answeredquestions/${id}`)
    };

    navigate = itemProps => <Button
        onClick={(e) => this.navigateToAnswered(e, this.props.id)} {...itemProps} />;

    //    TODO get unanswered questions and remove to pass isAnswered when rendering questions
    render() {
        const {id, users} = this.props;
        const user = users[id];
        return (
            <div align="center">
                {user === undefined
                    ? null
                    :
                    <div>
                        <h1> Welcome back !</h1>
                        <User id={id}/>
                        <div><Button component={this.navigate} color="secondary" variant="raised">To Answered</Button>

                        </div>
                    </div>}
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

export default withRouter(connect(mapStateToProps)(UnansweredQuestions))