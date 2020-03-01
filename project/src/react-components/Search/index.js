import React from "react";
import {} from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import MaterialTable from 'material-table';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Button from "@material-ui/core/Button";
import Select, {Option} from '@material/react-select';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import './styles.css'


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords: '',
            /** Hardcoding some researches */
            researchList: [{title: 'Computational Genomics', researcher: 'James Charles', term: '2020 Fall - 2021 Winter', deadline: '2020.06.30'},{title: 'The Effect of Global Warming', researcher: 'Sally Tomkins', term: '2020 summer', deadline: '2020.03.01'},{title: 'Quantitative Transportation Geography and Spatial Analysis', researcher: 'Steven Farber', term: '2020 Fall - 2021 Winter', deadline: '2020.07.30'}]
        };

    }
   
    handleKeywords(e) {
        this.setState({keywords: e.target.value});
    }
    
    render() {  
    
        let filteredList = this.state.researchList.filter(
            (research) => {
                return research.title.toLowerCase().indexOf(this.state.keywords.toLowerCase()) !== -1 || research.researcher.toLowerCase().indexOf(this.state.keywords.toLowerCase()) !== -1;
            }
        )

        return (
            <div>
                <div id="filter-container">
                <input type="text"
                       className="keyword-filter" 
                       name="search" 
                       placeholder="Search Keywords: research area, researcher..."
                       onChange={(e)=>this.setState({keywords: e.target.value})}
                       />
                </div>
                <ul>
                    {filteredList.map((research) => {
                        return <li class="research-info-container">
                                <ResearchInfo research={research}/>
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
      padding: theme.spacing(8),
      margin: 'auto',
      maxWidth: 800,
    },

}));
  
function ResearchInfo (props) {
      
      const classes = useStyles();
  
      return (
          <div className={classes.root}>
              
              <Paper className={classes.paper}>
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                        <ButtonBase>
                          <Typography gutterBottom variant="subtitle1">
                         Title: {props.research.title}
                          </Typography>
                          </ButtonBase>
                          <Typography variant="body2" gutterBottom>
                        Introduction
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                          Researcher: {props.research.researcher}
                          </Typography>
                        </Grid>
                 </Grid>
              <Grid item>
              <Typography variant="subtitle1">Deadline: {props.research.deadline}</Typography>
              <Typography variant="subtitle1">Duration: {props.research.term}</Typography>
              </Grid>
                </Grid>
            </Grid>
            </Paper>
            
      </div>
    );
  }