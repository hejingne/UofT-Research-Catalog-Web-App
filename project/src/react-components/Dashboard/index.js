import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";

import "./styles.css";


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dashboardInfo: {
                "User Type": "Student",
                "Current Employment State": "Unemployed",
                "Current Employer": "N/A",
                "Number of Applications Submitted": "0",
                "Number of Opportunities Posted": "0",
                "More Information": "N/A",
            }
        };
    }

    render() {
        return (
            <div id="grid-container">
                {
                    Object.entries(this.state.dashboardInfo).map((element) => {
                        return (
                            <Grid id="item" item xs>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            {element[0]}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {element[1]}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </div>
        );
    }
}

export default withRouter(Dashboard);