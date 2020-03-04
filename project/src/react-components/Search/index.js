import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Typography, ButtonBase, TextField, Button}  from '@material-ui/core';
import Link from '@material-ui/core/Link';
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';


import './styles.css'


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords: '',
            /** Hardcoding some researches */
            researchList: [{title: 'Computational Genomics', researcher: 'James Charles', term: '2020 Fall - 2021 Winter', deadline: '2020.06.30'},{title: 'The Effect of Global Warming', researcher: 'Sally Tomkins', term: '2020 summer', deadline: '2020.03.01'},{title: 'Quantitative Transportation Geography and Spatial Analysis', researcher: 'Steven Farber', term: '2020 Fall - 2021 Winter', deadline: '2020.07.30'}],
            toApplication: false
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

        let role = this.props.userType;
        return (
            <div>
                <Grid id="filter-container" item justify="center">
                <Grid item xs={7} container spacing={2}>
                <TextField label="Search Keywords: research area, researcher, (e.g., global warming)..."
                           onChange={(e)=>this.setState({keywords: e.target.value})}
                           className="search-keyword"
                           fullWidth
                />
                </Grid>
                </Grid>
                <ul>
                    {filteredList.map((research) => {
                        return <li class="research-info-container" style={{flexGrow: 1}}>
                                {role === "Student" &&
                                <Grid container spacing={1} justify="center"
                                alignItems="center">
                                <Grid item xs={7}>
                                <ResearchInfo research={research}/> 
                                </Grid>
                                <Grid item>
                                <Button onClick={()=>this.setState({toApplication: true})} className="login__button">Apply</Button>
                                </Grid>
                                </Grid>}
                                {role === "Researcher" &&
                                <Grid container spacing={1} justify="center"
                                alignItems="center">
                                <Grid item xs={9}>
                                <ResearchInfo research={research}/> 
                                </Grid>
                                </Grid>
                                }
                                {role === "Administrator" && 
                                <Grid container spacing={1} justify="center"
                                alignItems="center">
                                <Grid item xs={7}>
                                <ResearchInfo research={research}/> 
                                </Grid>
                                <Grid>
                                <Grid container direction="column" justify="center">
                                <Button onClick={()=>this.setState({toApplication: true})} className="login__button">Apply</Button>
                                <Button onClick={()=>{for (let i = 0; i < this.state.researchList.length; i++) {
                                    if (research.title === this.state.researchList[i].title) {
                                        this.state.researchList.splice(i, 1);
                                        this.setState({researchList: this.state.researchList});
                                        return ;
                                    }
                                }}} className="login__button">Remove</Button>
                                </Grid>
                                </Grid>
                                </Grid>
                                }
                                
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

  
function ResearchInfo (props) {
      
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
                          <Link style={{color: '#01579b'}} href="">
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
                          Deadline: {props.research.deadline}     Duration: {props.research.term}
                          </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
            
      </div>
    );
}
