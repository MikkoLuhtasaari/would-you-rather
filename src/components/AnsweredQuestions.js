import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import Question from "./Question"
    
class AnsweredQuestions extends Component {
    render(){
        const {questions, authedUser} = this.props;

        let answered = [];
        for (let key in questions) {
            for(let i = 0; i < questions[key].optionOne["votes"].length; i++) {
                if(questions[key].optionOne["votes"][i].toString().toLowerCase() === authedUser["id"].toString().toLowerCase()) {
                    answered = answered.concat(questions[key])
                }
            }
            for(let i = 0; i < questions[key].optionTwo["votes"].length; i++) {
                if(questions[key].optionTwo["votes"][i].toString().toLowerCase() === authedUser["id"].toString().toLowerCase()) {
                    answered = answered.concat(questions[key])
                }
            }
        }
        answered.sort((a, b) => b.timestamp - a.timestamp);
        console.log(answered);
        return (
            <div style={{paddingTop: 2 + "em"}} align="center">
                <h2>AnsweredQuestions</h2>
                <ul className="no-bullets">
                {answered.map((question) => (
                    <li key ={question["id"]}>
                        <div>
                            <Question id={question["id"]} isAnswered={true} />
                        </div>
                    </li>
                ))}
                </ul>
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