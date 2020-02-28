import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ReactDOM from 'react-dom';

import './styles.css'

/** Hardcoding some researches to browse through */


class StudentHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          initialState: "Search for movies, shows, actors, etc...",
          currentText: " "
        }
      }
    
      changeText(currentText) {
        this.setState({currentText});
        //console.log({currentText});
      }
    
      render() {
        return (
            <div>
              <div class="theater">
                <img src={'movie_theater3.jpg'} alt={"Theater"} class="theater_background" height="550px" width="100%" />
              </div>
    
    
              <div class="search-box">
                <form>
                  <input type="text" placeholder={this.state.initialState} onChange={this.changeText.bind(this, 'currentText')} />
                  <button onClick={this.changeText.bind(this, 'currentText')}>Search</button>
                </form>
              </div>
            </div>
        );
    
      }
    
    

}

export default withRouter(StudentHomePage);