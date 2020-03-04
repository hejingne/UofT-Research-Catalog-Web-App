import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Typography, ButtonBase, TextField, Button} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import ApplicationForm from "../ApplicationForm"
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';


import './styles.css'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords: '',
            /** Hardcoding some researches */
            researchList: [{
                title: 'Computational Genomics',
                description: 'This is some details of this research. Thus is some more details of this research.',
                researcher: 'James Charles',
                term: '2020 Fall - 2021 Winter',
                deadline: '2020.06.30'
            }, {
                title: 'The Effect of Global Warming',
                description: 'This is some details of this research. Thus is some more details of this research.',
                researcher: 'Sally Tomkins',
                term: '2020 summer',
                deadline: '2020.03.01'
            }, {
                title: 'Quantitative Transportation Geography and Spatial Analysis',
                description: 'This is some details of this research. Thus is some more details of this research.',
                researcher: 'Steven Farber',
                term: '2020 Fall - 2021 Winter',
                deadline: '2020.07.30'
            }],
        };

    }


    render() {

        let filteredList = this.state.researchList.filter(
            (research) => {
                return research.title.toLowerCase().indexOf(this.state.keywords.toLowerCase()) !== -1 || research.researcher.toLowerCase().indexOf(this.state.keywords.toLowerCase()) !== -1;
            }
        )

        if (this.state.toApplication === true) {
            return <Redirect to="/application"/>;
        }

        return (

            <div>
                <Grid id="filter-container" item justify="center">
                    <Grid item xs={7} container spacing={2}>
                        <TextField label="Search Keywords: research area, researcher, (e.g., global warming)..."
                                   onChange={(e) => this.setState({keywords: e.target.value})}
                                   className="search-keyword"
                                   fullWidth
                        />
                    </Grid>
                </Grid>
                <ul>
                    {filteredList.map((research) => {
                        return <li class="research-info-container" style={{flexGrow: 1}}>
                            <Grid container spacing={1} justify="center"
                                  alignItems="center">
                                <Grid item xs={7}>
                                    <ResearchInfo research={research}/>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => this.setState({toApplication: true})}
                                            className="login__button">Apply</Button>
                                </Grid>
                            </Grid>
                        </li>
                    })}
                </ul>
            </div>
        );
    }
}

export default Search;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        margin: 'auto',
        maxWidth: 650,
        backgroundColor: '#eeeeee'
    }
}));


function ResearchInfo(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <ButtonBase>
                                    <Typography gutterBottom variant="h6">
                                        <Link style={{color: '#01579b'}} onClick={handleClickOpen}>
                                            {props.research.title}
                                        </Link>
                                    </Typography>
                                </ButtonBase>
                                <Typography variant="subtitle1" gutterBottom>
                                    Introduction
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Researcher: {props.research.researcher}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Deadline: {props.research.deadline} Duration: {props.research.term}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Dialog
                id="application-detail-dialog"
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {props.research.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Introduction:
                        <DialogContentText>
                            {props.research.description}
                        </DialogContentText>
                    </DialogContentText>
                    <DialogContentText>
                        Researcher: {props.research.researcher}
                    </DialogContentText>
                    <DialogContentText>
                        Deadline: {props.research.deadline}
                    </DialogContentText>
                    <DialogContentText>
                        Duration: {props.research.term}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
