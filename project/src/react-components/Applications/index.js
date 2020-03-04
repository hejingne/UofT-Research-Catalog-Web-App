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
import ButtonBase from "@material-ui/core/ButtonBase";

import "./styles.css";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";


class Applications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            researchList: [{
                title: 'Computational Genomics',
                researcher: 'James Charles',
                term: '2020 Fall - 2021 Winter',
                deadline: '2020.06.30'
            }, {
                title: 'The Effect of Global Warming',
                researcher: 'Sally Tomkins',
                term: '2020 summer',
                deadline: '2020.03.01'
            }, {
                title: 'Quantitative Transportation Geography and Spatial Analysis',
                researcher: 'Steven Farber',
                term: '2020 Fall - 2021 Winter',
                deadline: '2020.07.30'
            }]
        };
    }

    render() {
        console.log(this.props.userType)
        return (
            <List id="research-container">
                {this.state.researchList.map((research) => {
                    return (
                        <Grid id="research-item" item xs>
                            <ButtonBase>
                                <Typography gutterBottom variant="h6">
                                    <Link style={{color: '#01579b'}} href="">
                                        {research.title}
                                    </Link>
                                </Typography>
                            </ButtonBase>
                            <Typography variant="subtitle1" gutterBottom>
                                Introduction
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Researcher: {research.researcher}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Deadline: {research.deadline}  Duration: {research.term}
                            </Typography>
                            <Divider />
                        </Grid>

                    );
                })}
            </List>
        );
    }
}

export default withRouter(Applications);