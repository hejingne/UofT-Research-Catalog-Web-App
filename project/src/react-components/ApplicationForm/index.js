import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Typography, ButtonBase, TextField, Button}  from '@material-ui/core';

import './styles.css'


class ApplicationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cv = React.createRef();
        this.transcript = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!(this.cv.current.files[0] && this.transcript.current.files[0])) {
            console.log("Requested files are not there.");
            return ;
        }
        
        alert(
          `Successfully applied. Selected files - ${
            this.cv.current.files[0].name
          }, ${
              this.transcript.current.files[0].name
          }`
        );
        /**Omitted database operations */
    }
    
    render() {  

        return (
            <div id="application-container">
                <div style={{flexGrow: 1}} spacing={5} direction="column" justify="center">   
                <Paper style={{margin: "auto", maxWidth: 1000, backgroundColor: '#eeeeee'}}>

                <Grid item xs={12} justify="center" sm container spacing={3} style={{padding: 40}}>
                    <Grid item xs={9} container direction="column" spacing={3}>
                        <Typography gutterBottom variant="h5">
                          Personal Information:
                        </Typography>
                        <TextField variant="outlined" margin="normal" required
                            fullWidth id="name" label="Name" name="name" autoComplete="name" autoFocus
                        />
                        <TextField variant="outlined" margin="normal" required
                            fullWidth id="email" label="Email" name="email"
                            autoComplete="email" autoFocus
                        />
                        <TextField variant="outlined" margin="normal" required
                            fullWidth id="phone-number" label="Phone Number"
                            name="phone-number" autoComplete="phone-number"
                            autoFocus
                        />
                        <TextField variant="outlined" margin="normal" required
                            fullWidth id="major" label="Major" name="major"
                            autoComplete="major" autoFocus
                        />
                    </Grid>
                </Grid>      
                <Grid item xs={12} justify="center" sm container spacing={3} style={{padding: 40}}>
                    <Grid item xs={9} container direction="column" spacing={3}>
                        <Typography gutterBottom variant="h5">
                            Please answer the following questions:
                        </Typography>
                        <Typography variant="h6">
                            1. What interests you about this research?
                        </Typography>
                        <TextField margin="normal" required
                            fullWidth autoFocus multiline id="question-one"
                        />
                        <Typography variant="h6">
                            2. What skills can you bring to the laboratory?
                        </Typography>
                        <TextField margin="normal" required
                            fullWidth autoFocus multiline id="question-two"
                        />
                        <Typography variant="h6">
                            3. Do you have any previous research experience? If yes, please briefly describe the project, including your role in the project.
                        </Typography>
                        <TextField margin="normal" required
                            fullWidth autoFocus multiline id="question-three"
                        />
                        <Typography variant="h6">
                            4. How many hours in a week can you commit to being in the lab?
                        </Typography>
                        <TextField margin="normal" required
                            fullWidth autoFocus multiline id="question-four"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} justify="center" sm container spacing={3} style={{padding: 40}}>
                    <Grid item xs={9} container direction="column" spacing={3}>
                    <Typography gutterBottom variant="h5">
                            Please attach the following documents:
                    </Typography>
                    <Typography gutterBottom variant="h6">
                       1. CV <input type="file" ref={this.cv} />
                    </Typography>
                    <br/>
                    <Typography gutterBottom variant="h6">
                       2. Unofficial Transcript <input type="file" ref={this.transcript} />
                    </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} justify="center" sm container spacing={3} style={{padding: 40}}>
                    <Button className="login__button" type="submit" onClick={this.handleSubmit}>Submit</Button>
                </Grid>
                </Paper>      
            </div>
            <div style={{height: 300}}/>
            </div>
        );
      }
}

export default ApplicationForm;