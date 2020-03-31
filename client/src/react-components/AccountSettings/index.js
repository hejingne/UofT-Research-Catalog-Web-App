import React from "react";
import {} from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import Divider from "@material-ui/core/Divider";
// import fs from "fs";
import api from "../../api";

import "./styles.css";

class AccountSettings extends React.Component {
    constructor(props) {
        super(props);
        this.profilePicture = React.createRef();
        this.handleConfirmResetPassword = this.handleConfirmResetPassword.bind(
            this
        );
        this.handleChangeProfilePicture = this.handleChangeProfilePicture.bind(
            this
        );
        this.handleSignOut = this.handleSignOut.bind(this);
        this.state = {
            resetPassword: {
                textFieldOpenState: false,
                alertOpenState: false,
                successAlertOpenState: false,
                currentPassword: "",
                newPassword: "",
                newPasswordConfirm: ""
            }
        };
    }

    setStateResetPassword(state) {
        this.setState({
            resetPassword: { ...this.state.resetPassword, ...state }
        });
    }

    handleSignOut() {
        this.props.history.push("/signOut");
    }

    handleConfirmResetPassword() {
        this.setStateResetPassword({
            successAlertOpenState: false,
            alertOpenState: false
        });
        const emptyFields = Object.entries(this.state.resetPassword).filter(
            (entry) => entry[1] === ""
        );
        if (emptyFields.length > 0) {
            return null;
        }
        if (
            this.state.resetPassword.newPassword !==
            this.state.resetPassword.newPasswordConfirm
        ) {
            this.setStateResetPassword({ alertOpenState: true });
        } else {
            // update backend to change password
            const sessionId = localStorage.getItem("sessionId")
                ? localStorage.getItem("sessionId")
                : sessionStorage.getItem("sessionId");
            api.getSession(sessionId).then((response) => {
                if (response.data.success) {
                    api.updatePassword({
                        emailAddress: response.data.user.emailAddress,
                        password: this.state.resetPassword.newPassword,
                        userType: response.data.user.userType
                    }).then((res) => {
                        if (res.data.success) {
                            this.setStateResetPassword({
                                successAlertOpenState: true
                            });
                            setTimeout(
                                () =>
                                    this.setStateResetPassword({
                                        successAlertOpenState: false,
                                        textFieldOpenState: false
                                    }),
                                2000
                            );
                        } else {
                            this.setStateResetPassword({
                                alertOpenState: true
                            });
                        }
                    });
                } else {
                    return this.props.history.push("/signOut");
                }
            });
        }
    }

    handleChangeProfilePicture(e) {
        const file = e.target.files[0];

        const data = new FormData();
        data.append("profilePicture", file);
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        api.getSession(sessionId).then((response) => {
            if (!response.data.success) {
                return this.props.history.push("/signOut");
            }
            data.append("emailAddress", response.data.user.emailAddress);
            api.updateProfilePicture(data);
        });
    }

    render() {
        return (
            <div id="account-settings-container">
                <Button
                    id="student"
                    className="login__button center"
                    onClick={() =>
                        this.setStateResetPassword({
                            textFieldOpenState: !this.state.resetPassword
                                .textFieldOpenState
                        })
                    }
                >
                    RESET PASSWORD
                </Button>
                {this.state.resetPassword.textFieldOpenState && (
                    <Container maxWidth="xs" id="reset-password-container">
                        <form
                            className="form"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            {this.state.resetPassword.alertOpenState && (
                                <Alert
                                    onClose={() =>
                                        this.setStateResetPassword({
                                            alertOpenState: false
                                        })
                                    }
                                    severity="error"
                                >
                                    <AlertTitle>Error</AlertTitle>
                                    Sorry, something went wrong. Please check
                                    the passwords you entered and try again.
                                </Alert>
                            )}
                            {this.state.resetPassword.successAlertOpenState && (
                                <Alert
                                    onClose={() => {
                                        this.setStateResetPassword({
                                            successAlertOpenState: false
                                        });
                                    }}
                                    severity="success"
                                >
                                    <AlertTitle>Success</AlertTitle>
                                    Password updated successfully.
                                </Alert>
                            )}
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
                                onChange={(e) =>
                                    this.setStateResetPassword({
                                        currentPassword: e.target.value
                                    })
                                }
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
                                onChange={(e) =>
                                    this.setStateResetPassword({
                                        newPassword: e.target.value
                                    })
                                }
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
                                onChange={(e) =>
                                    this.setStateResetPassword({
                                        newPasswordConfirm: e.target.value
                                    })
                                }
                            />
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
                        <Divider id="reset-password-divider" />
                    </Container>
                )}
                <Button
                    className="login__button center"
                    onClick={() => {
                        document
                            .getElementById("upload-profile-pic-btn")
                            .click();
                    }}
                >
                    CHANGE PROFILE PICTURE
                    <input
                        id="upload-profile-pic-btn"
                        type="file"
                        accept="image/*"
                        onChange={(e) => this.handleChangeProfilePicture(e)}
                        ref={this.profilePicture}
                    />
                </Button>
                <Button
                    className="login__button center"
                    onClick={this.handleSignOut}
                >
                    SIGN OUT
                </Button>
            </div>
        );
    }
}

export default withRouter(AccountSettings);
