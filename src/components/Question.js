import React, {Component} from "react"
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Question extends Component {

    //TODO functionality plus rename
    handleStuff = (e, question, authedUser) => {
        e.preventDefault();
        console.log(question, authedUser);
    };

    vote = itemProps => <Button
        onClick={(e) => this.handleStuff(e, this.props.question, this.props.authedUser)} {...itemProps} />;

    render() {
        const {question, authedUser, isAnswered} = this.props;
        return (
            <div>
                <Grid container alignContent="center" spacing={8}>
                    <Grid item xs={6}>
                        <Card raised={true}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    {question.optionOne.text}
                                </Typography>
                                <Typography color="textSecondary">
                                    Votes: {question.optionOne.votes.length}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {isAnswered ? (
                                    <Button disabled variant="raised" color="primary" fullWidth={true}>Vote</Button>
                                ) : (<Button component={this.vote} variant="raised" color="primary"
                                             fullWidth={true}>Vote</Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card raised={true}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    {question.optionTwo.text}
                                </Typography>
                                <Typography color="textSecondary">
                                    Votes: {question.optionTwo.votes.length}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {isAnswered ? (
                                    <Button disabled variant="raised" color="secondary" fullWidth={true}>Vote</Button>
                                ) : (<Button component={this.vote} variant="raised" color="secondary"
                                             fullWidth={true}>Vote</Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser}, {id, isAnswered}) {
    const question = questions[id];
    return {
        question,
        authedUser,
        isAnswered
    }
}

export default withRouter(connect(mapStateToProps)(Question))