import React, {Component} from "react"
import {connect} from "react-redux"
import User from "./User"

class LoginPage extends Component {
    render() {
        return (
            <div>
                <h3>Please login</h3>
                <ul>
                    {this.props.userIds.map((id) => (
                        <li key={id}>
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