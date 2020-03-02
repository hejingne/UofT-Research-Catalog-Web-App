import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import "./styles.css";


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div id="grid-container">
                <Grid container spacing={3}>
                    <Grid id="item" item xs>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    User Type
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Student
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid id="item" item xs>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Current Employment State
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Unemployed
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid id="item" item xs>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Current Employment Institution
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    N/A
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid id="item" item xs>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Number of Applications Submitted
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    0
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid id="item" item xs>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Number of Applications Posted
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    N/A
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid id="item" item xs>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    More Info
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    N/A
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Dashboard);