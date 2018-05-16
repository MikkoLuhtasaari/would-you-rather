import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {handleSaveQuestion} from "../actions/questions"


class NewQuestion extends Component {

    state = {
        optionOneText: "",
        optionTwoText: "",
        toHome: false
    };

    handleChange1 = (e) => {
        const text = e.target.value;
        this.setState(() => ({
            optionOneText: text
        }))
    };
    handleChange2 = (e) => {
        const text = e.target.value;
        this.setState(() => ({
            optionTwoText: text
        }))
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {optionOneText, optionTwoText} = this.state;
        console.log(optionOneText, optionTwoText);
        const {dispatch} = this.props;
        new Object({optionOneText, optionTwoText});

        dispatch(handleSaveQuestion(new Object({optionOneText, optionTwoText})));

        this.setState(() => ({
            optionOneText: "",
            optionTwoText: "",
            toHome: true
        }))
    };

    render(){
        const {authedUser} = this.props;
        const {optionOneText, optionTwoText, toHome} = this.state;

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
                        value={optionOneText}
                        className="textarea"
                        maxLength="200"
                        onChange={this.handleChange1}
                        />
                    <textarea
                        placeholder="Answer 2"
                        value={optionTwoText}
                        className="textarea"
                        maxLength="200"
                        onChange={this.handleChange2}
                    />
                    <button
                        type="submit"
                        disabled={optionOneText === "" && optionTwoText === ""}>
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