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
import TextField from "@material-ui/core/TextField";
import {Container} from "@material-ui/core";

class AccountSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accountSettingsInfo: {
                "User Type": localStorage.getItem("userType") ? localStorage.getItem("userType") : sessionStorage.getItem("userType"),
            },
            resetPassword: {
                resetPasswordTextFieldState: false,
            }

        };
    }

    componentDidMount() {
        // connect to db to fetch and use this.setState() to update dashboardInfo
    }

    handleOnResetPassword(e) {
        this.setState(prevState => ({
            resetPassword: {
                ...prevState.resetPassword,
                resetPasswordTextFieldState: !prevState.resetPassword.resetPasswordTextFieldState,
            }
        }));
    }

    render() {
        return (
            <div id="account-settings-container">
                <Button id="student" className="login__button center" onClick={(e) => {
                    this.handleOnResetPassword(e)
                }}>RESET PASSWORD</Button>
                {this.state.resetPassword.resetPasswordTextFieldState &&
                <Container maxWidth="xs" id="reset-password-container">
                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="currentPassword"
                            label="Current Password"
                            type="password"
                            id="currentPassword"
                            autoComplete="current-password"
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword1"
                            label="New Password"
                            type="password"
                            id="newPassword1"
                            autoComplete="current-password"
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword2"
                            label="New Password"
                            type="password"
                            id="newPassword2"
                            autoComplete="current-password"
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                    </form>
                </Container>
                }

                <Button className="login__button center" onClick={(e) => {
                    this.handleOnClick(e)
                }}>RESEARCHER</Button>
                <Button className="login__button center" onClick={(e) => {
                    this.handleOnClick(e)
                }}>ADMINISTRATOR</Button>
            </div>
        );
    }
}

export default withRouter(AccountSettings);