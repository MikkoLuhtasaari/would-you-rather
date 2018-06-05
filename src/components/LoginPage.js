import React, {Component} from "react"
import {connect} from "react-redux"
import User from "./User"
import {handleInitialData} from "../actions/shared";

class LoginPage extends Component {
    // // If user is trying to access protected url gently redirect back to base url
    // componentWillMount() {
    //     if(this.props.location.pathname !== "/") {
    //         this.props.history.push("/");
    //     }
    // }
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return (
            <div align="center">
                <h1>Please login</h1>
                <ul>
                    {this.props.userIds.map((id) => (
                        <li className="no-bullets"
                            key={id}>
                            <div>
                                <User id={id} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        userIds: Object.keys(users)
            .sort((a, b) => users[b].id - users[a].id)
    }
}

export default connect(mapStateToProps)(LoginPage)