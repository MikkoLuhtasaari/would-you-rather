import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
    
class AnsweredQuestions extends Component {
    render(){
        const {questions, authedUser} = this.props;

        let answered1 = [];
        let answered2 = [];
        for (let key in questions) {
            for(let i = 0; i < questions[key].optionOne["votes"].length; i++) {
                if(questions[key].optionOne["votes"][i].toString().toLowerCase() === authedUser["id"].toString().toLowerCase()) {
                    console.log("Found correct");
                    answered1 = answered1.concat(questions[key].optionOne)
                }
            }
            for(let i = 0; i < questions[key].optionTwo["votes"].length; i++) {
                if(questions[key].optionTwo["votes"][i].toString().toLowerCase() === authedUser["id"].toString().toLowerCase()) {
                    console.log("Found correct");
                    answered2 = answered2.concat(questions[key].optionTwo)
                }
            }
        }
        console.log(answered1, answered2);
        return (
            <div className="col-xs-1" align="center">
                <h2>AnsweredQuestions</h2>
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser}) {
    return {
        questions,
        authedUser
    }
}
    
export default withRouter(connect(mapStateToProps)(AnsweredQuestions))