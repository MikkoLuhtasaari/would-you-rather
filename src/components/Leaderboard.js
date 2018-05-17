import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import User from "./User"
import LeaderboardCardItem from "./LeaderboardCardItem"

class Leaderboard extends Component {

    gatherUserAnswers = (usersWithAnswers) => {
        for(let key in this.props.users) {
            usersWithAnswers.push({user: this.props.users[key], answerAmount: this.props.users[key].questions.length + Object.keys(this.props.users[key].answers).length})
        }
    };

    render(){
        const {authedUser} = this.props;
        let usersWithAnswers = [];
        this.gatherUserAnswers(usersWithAnswers);
        usersWithAnswers.sort((a, b) => b.answerAmount - a.answerAmount);
        return (
            <div>
                <h1> Welcome back !</h1>
                <User id={authedUser}/>
                <h1>Leaderboard</h1>
                {usersWithAnswers.map((user) => (
                    <LeaderboardCardItem key={user.user.id} user={user.user}/>
                    ))}

            </div>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        users
    }
}
    
export default withRouter(connect(mapStateToProps)(Leaderboard))