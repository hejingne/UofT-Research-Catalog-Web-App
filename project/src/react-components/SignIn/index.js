import React from "react";
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
import {Alert, AlertTitle} from '@material-ui/lab';


import "./styles.css";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.state = {
            emailAddress: "",
            password: "",
            rememberMe: false,
            alertOpenState: false,
        };
    }

    handleSignIn() {
        const emptyFields = Object.entries(this.state).filter((info) => info[1] === "");
        if (emptyFields.length > 0) {
            return null;
        }
        const {state} = this.props.location;
        const userType = state.role.charAt(0) + state.role.slice(1).toLowerCase();
        // connect to database to authenticate username and password
        if (userType === "Student" && this.state.emailAddress === "user" && this.state.password === "user" ||
            userType === "Researcher" && this.state.emailAddress === "user2" && this.state.password === "user2" ||
            userType === "Administrator" && this.state.emailAddress === "admin" && this.state.password === "admin") {
            if (this.state.rememberMe) {
                localStorage.setItem("hasSignIn", "true");
            } else {
                sessionStorage.setItem("hasSignIn", "true");
            }
            this.props.history.push({
                pathname: "/home",
            })
        } else {
            this.setState({alertOpenState: true});
            return null;
        }
    }

    render() {
        const {state} = this.props.location;
        const userType = state.role.charAt(0) + state.role.slice(1).toLowerCase();

        if (!state || !state.role) {
            return <Redirect to="/home"/>;
        }

        return (
            <Container id="container" component="main" maxWidth="xs">
                <div>
                    {this.state.alertOpenState &&
                    <Alert onClose={() => {
                        this.setState({alertOpenState: false})
                    }} id="error-alert" severity="error">
                        <AlertTitle>Error</AlertTitle>
                        You have entered an invalid email address or password, please try again.
                    </Alert>}
                    <div id="sign-in-title-box">
                        <Avatar className="">
                        </Avatar>
                        <Typography id="sign-in-title" component="h1" variant="h5">
                            {"Sign in as " + userType}
                        </Typography>
                    </div>
                    <form className="form" onSubmit={(e) => e.preventDefault()}>
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            onChange={() => {
                                this.setState({rememberMe: true})
                            }}
                            label="Remember me"
                        />
                        <Button
                            id="submit"
                            type="submit"
                            fullWidth
                            className="login__button center"
                            onClick={this.handleSignIn}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    Don't have an account? Sign Up
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

export default withRouter(SignIn);