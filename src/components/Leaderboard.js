import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import User from "./User"
import LeaderBoardCardItem from "./LeaderboardCardItem"

class Leaderboard extends Component {
    render(){
        const {authedUser, users} = this.props;
        console.log(users[authedUser]);
        return (
            <div>
                <h1> Welcome back !</h1>
                <User id={authedUser}/>
                <h1>Leaderboard</h1>
                <LeaderBoardCardItem user={users[authedUser]}/>
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