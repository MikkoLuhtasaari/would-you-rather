import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {handleSaveQuestion} from "../actions/questions"


class NewQuestion extends Component {

    state = {
        optionOne: "",
        optionTwo: "",
        toHome: false
    };

    handleChange1 = (e) => {
        const text = e.target.value;
        this.setState(() => ({
            optionOne: text
        }))
    };
    handleChange2 = (e) => {
        const text = e.target.value;
        this.setState(() => ({
            optionTwo: text
        }))
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {optionOne, optionTwo} = this.state;
        console.log(optionOne, optionTwo);
        const {dispatch} = this.props;

        dispatch(handleSaveQuestion({optionOneText: optionOne, optionTwoText: optionTwo}));

        this.setState(() => ({
            optionOne: "",
            optionTwo: "",
            toHome: true
        }))
    };

    render(){
        const {authedUser} = this.props;
        const {optionOne, optionTwo, toHome} = this.state;

        if(toHome === true) {
            console.log("Redirect");
            return <Redirect to={"/unansweredquestions/"+authedUser.id}/>
        }

        return (
            <div>
                <h1>NewQuestion</h1>
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="Answer 1"
                        value={optionOne}
                        className="textarea"
                        maxLength="200"
                        onChange={this.handleChange1}
                        />
                    <textarea
                        placeholder="Answer 2"
                        value={optionTwo}
                        className="textarea"
                        maxLength="200"
                        onChange={this.handleChange2}
                    />
                    <button
                        type="submit"
                        disabled={optionOne === "" && optionTwo === ""}>
                        Submit</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)