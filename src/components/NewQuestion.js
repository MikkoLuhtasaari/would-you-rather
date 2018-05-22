import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {handleSaveQuestion} from "../actions/questions"
import User from "./User"
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid/Grid";

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
        const {dispatch} = this.props;

        dispatch(handleSaveQuestion({optionOneText: optionOne, optionTwoText: optionTwo}));

        this.setState(() => ({
            optionOne: "",
            optionTwo: "",
            toHome: true
        }))
    };

    render() {
        const {authedUser} = this.props;
        const {optionOne, optionTwo, toHome} = this.state;

        if (toHome === true) {
            return <Redirect to={"/unansweredquestions"}/>
        }

        return (
            <div>
                <Grid container justify="center">
                    <Grid item>
                        <h1> Welcome back !</h1>
                    </Grid>
                </Grid>
                <User id={authedUser}/>
                <Grid container justify="center">
                    <Grid>
                        <h1>NewQuestion</h1>
                    </Grid>
                </Grid>
                <form onSubmit={this.handleSubmit}>
                    <Grid container justify="center">
                        <Grid item xs={4}/>
                        <Grid item>
                            <TextField
                                placeholder="Answer 1"
                                value={optionOne}
                                className="textarea"
                                maxLength="200"
                                onChange={this.handleChange1}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                placeholder="Answer 2"
                                value={optionTwo}
                                className="textarea"
                                maxLength="200"
                                onChange={this.handleChange2}
                            />
                        </Grid>
                        <Grid item xs={4}/>
                        <Grid container justify="center">
                        <Grid item>
                            <Button
                                size="large"
                                color="primary"
                                type="submit"
                                disabled={optionOne === "" || optionTwo === ""}>
                                Submit</Button>
                        </Grid>
                    </Grid>
                    </Grid>
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