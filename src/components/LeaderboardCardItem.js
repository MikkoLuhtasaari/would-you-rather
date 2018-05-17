import React, {Component} from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

class LeaderboardCardItem extends Component {

    render(){
        const {user} = this.props;
        return (
            <div>
                <Grid container alignContent="center" spacing={8}>
                    <Grid item xs={12}>
                        <Card raised={true}>
                            <CardContent>
                                <Typography align="center" variant="headline" component="h2">
                                    User: {user.name}
                                </Typography>
                                <Avatar align="center" alt={user.name} src={user.avatarURL} />
                                <Typography variant="body1" align="center">
                                    Asked: {user.questions.length}
                                </Typography>
                                <Typography variant="body1" align="center">
                                    Answered: {Object.keys(user.answers).length}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps({}, {user}) {
    return {
        user,
    }
}
    
export default withRouter(connect(mapStateToProps)(LeaderboardCardItem))