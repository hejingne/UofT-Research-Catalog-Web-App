import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

import "./styles.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            userType: "",
        };
    }

    handleSignUp() {
        // push data ion this.state to database at here to create user
        this.props.history.push({
            pathname: "/home",
        })
    }

    render() {
        return (
            <Container id="container" component="main" maxWidth="xs">
                <div>
                    <div id="sign-up-title-box">
                        <Avatar className="">
                        </Avatar>
                        <Typography id="sign-up-title" component="h1" variant="h5">
                            {"Sign up for new user "}
                        </Typography>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={(e) => this.setState({firstName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={(e) => this.setState({lastName: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <form className="form">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => this.setState({emailAddress: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                        <FormControl id="usertype-dropdown" variant="outlined" fullWidth required>
                            <InputLabel>
                                User Type
                            </InputLabel>
                            <Select
                                native
                                value={this.state.userType}
                                onChange={(e) =>
                                    this.setState({userType: e.target.value})}
                                fullWidth
                            >
                                <option value=""/>
                                <option value={1}>Student</option>
                                <option value={2}>Researcher</option>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox required value="remember" color="primary"/>}
                            label="Check here to indicate that you have read and agree to the terms of the U of T Research Catalogue"
                        />
                        <Button
                            id="submit"
                            type="submit"
                            fullWidth
                            className="login__button center"
                            onClick={this.handleSignUp}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/home" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                </Box>
            </Container>
        );
    }
}

export default withRouter(SignUp);