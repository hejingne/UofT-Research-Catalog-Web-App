import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Container} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import Divider from "@material-ui/core/Divider";

import "./styles.css";

class AccountSettings extends React.Component {

    constructor(props) {
        super(props);
        this.handleConfirmResetPassword = this.handleConfirmResetPassword.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.state = {
            accountSettingsInfo: {
                "User Type": localStorage.getItem("userType") ? localStorage.getItem("userType") : sessionStorage.getItem("userType"),
            },
            resetPassword: {
                textFieldOpenState: false,
                alertOpenState: false,
                successAlertOpenState: false,
                currentPassword: "",
                newPassword: "",
                newPasswordConfirm: "",
            }

        };
    }

    setStateResetPassword(state) {
        this.setState({
            resetPassword: {...this.state.resetPassword, ...state}
        });
    }

    handleSignOut() {
        localStorage.removeItem("userType");
        sessionStorage.removeItem("userType");
        this.props.history.push("/home");
    }

    handleConfirmResetPassword() {
        this.setStateResetPassword({successAlertOpenState: false, alertOpenState: false});
        const emptyFields = Object.entries(this.state.resetPassword).filter((entry) => entry[1] === "");
        if (emptyFields.length > 0) {
            return null;
        }
        if (this.state.resetPassword.newPassword !== this.state.resetPassword.newPasswordConfirm) {
            this.setStateResetPassword({alertOpenState: true});
        } else {
            // update backend to change password
            this.setStateResetPassword({successAlertOpenState: true})
            setTimeout(() =>
                this.setStateResetPassword({successAlertOpenState: false, textFieldOpenState: false}), 2000);
        }
    }

    render() {
        return (
            <div id="account-settings-container">
                <Button id="student" className="login__button center" onClick={() =>
                    this.setStateResetPassword({textFieldOpenState: !this.state.resetPassword.textFieldOpenState})
                }>RESET PASSWORD</Button>
                {this.state.resetPassword.textFieldOpenState &&
                <Container maxWidth="xs" id="reset-password-container">
                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                        {this.state.resetPassword.alertOpenState &&
                        <Alert onClose={() => this.setStateResetPassword({alertOpenState: false})} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            The passwords you entered does not match, please try again.
                        </Alert>}
                        {this.state.resetPassword.successAlertOpenState &&
                        <Alert onClose={() => {
                            this.setStateResetPassword({successAlertOpenState: false})
                        }} severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Password updated successfully.
                        </Alert>}
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
                            onChange={(e) => this.setStateResetPassword({currentPassword: e.target.value})}/>
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
                            onChange={(e) => this.setStateResetPassword({newPassword: e.target.value})}/>
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
                            onChange={(e) => this.setStateResetPassword({newPasswordConfirm: e.target.value})}/>
                        <Button
                            id="confirm"
                            type="submit"
                            fullWidth
                            className="login__button center"
                            onClick={this.handleConfirmResetPassword}
                        >
                            Confirm
                        </Button>
                    </form>
                    <Divider id="reset-password-divider"/>
                </Container>
                }
                <Button className="login__button center" onClick={this.handleSignOut}>SIGN OUT</Button>
            </div>
        );
    }
}

export default withRouter(AccountSettings);