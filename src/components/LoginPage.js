import React, {Component} from "react"
import {connect} from "react-redux"
import User from "./User"

class LoginPage extends Component {
    render() {
        return (
            <div className="col-xs-1" align="center">
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