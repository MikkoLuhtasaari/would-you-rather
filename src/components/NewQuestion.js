import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
    
class NewQuestion extends Component {
    render(){
        const {} = this.props;
        return (
            <div>
                NewQuestion
            </div>
        )
    }
}

function mapStateToProps({}) {
    return {
    
    }
}
    
export default withRouter(connect(mapStateToProps)(NewQuestion))