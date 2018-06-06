import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import LeaderboardCardItem from "./LeaderboardCardItem"

class Leaderboard extends Component {

    gatherUserAnswers = (usersWithAnswers) => {
        for (let key in this.props.users) {
            const user = this.props.users[key];
            const answered = Object.keys(this.props.users[key].answers).length;
            let asked = 0;
            for (let qkey in this.props.questions) {
                if (this.props.questions[qkey].author === user.id) {
                    asked++;
                }
            }
            usersWithAnswers.push({user: user, answerAmount: asked + answered})
        }
    };

    render() {
        let usersWithAnswers = [];
        this.gatherUserAnswers(usersWithAnswers);
        usersWithAnswers.sort((a, b) => b.answerAmount - a.answerAmount);
        return (
            <div>
                <h1>Leaderboard</h1>
                {usersWithAnswers.map((user) => (
                    <LeaderboardCardItem key={user.user.id} user={user.user}/>
                ))}

            </div>
        )
    }
}

function mapStateToProps({users, questions}) {
    return {
        users,
        questions
    }
}

export default withRouter(connect(mapStateToProps)(Leaderboard))