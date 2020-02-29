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

import "./styles.css";


/* Component for the Home page */
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.state = {
            rememberMe: false,
        };
    }

    handleSignIn() {
        if (this.state.rememberMe) {
            localStorage.setItem("hasSignIn", "true");
        } else {
            sessionStorage.setItem("hasSignIn", "true")
        }
    }

    render() {
        const {state} = this.props.location;

        if (!state || !state.role) {
            return <Redirect to="/home"/>;
        }

        return (
            <Container id="container" component="main" maxWidth="xs">
                <div>
                    <div id="sign-in-title-box">
                        <Avatar className="">
                        </Avatar>
                        <Typography id="sign-in-title" component="h1" variant="h5">
                            {"Sign in as " + state.role.charAt(0).toUpperCase() + state.role.slice(1)}
                        </Typography>
                    </div>
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
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
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