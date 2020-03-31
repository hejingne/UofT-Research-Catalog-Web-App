import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import MaterialTable from "material-table";
import apis from "../../api";

import "./styles.css";

class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userListColumns: [
                { title: "Email", field: "emailAddress" },
                { title: "User Type", field: "userType" }
            ],
            userList: [],
            applicationListColumns: [
                { title: "Application Id", field: "applicationId" },
                { title: "Applicant Name", field: "applicantName" },
                { title: "Applicant Email", field: "applicantEmailAddress" },
                { title: "Applied Research", field: "appliedResearch" },
                { title: "Status", field: "status" }
            ],
            applicationList: []
        };
    }

    fetchData() {
        // connect to db to fetch and use this.setState() to update info
        apis.getUsers().then((response) => {
            if (response.data.success) {
                let data = [];
                response.data.data.forEach((user) => {
                    data.push({
                        emailAddress: user.emailAddress,
                        userType: user.userType
                    });
                });
                this.setState({ userList: data });
            }
        });

        apis.getApplications().then((response) => {
            if (response.data.success) {
                let data = [];
                response.data.data.forEach((application) => {
                    data.push({
                        applicationId: application._id,
                        applicantName: application.applicantName,
                        applicantEmailAddress: application.emailAddress,
                        appliedResearch: application.researchTitle,
                        status: application.status
                    });
                });
                this.setState({ applicationList: data });
            }
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    handleOnClick(e) {
        // because each list has their own state, they dont update this.state locally
        this.fetchData();
        this.setState({ selectedTab: e.target.innerText });
    }

    render() {
        function UserList(props) {
            const [state, setState] = React.useState({
                columns: props.columns,
                data: props.data
            });

            return (
                <div id="user-list">
                    <MaterialTable
                        options={{ actionsColumnIndex: -1 }}
                        title="User List"
                        columns={state.columns}
                        data={state.data}
                        editable={{
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            data.push(newData);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            apis.updateEmailAddressAndUserType({
                                                emailAddress:
                                                    newData.emailAddress,
                                                userType: newData.userType
                                            }).then((res) => {
                                                if (res.data.success) {
                                                    setState((prevState) => {
                                                        const data = [
                                                            ...prevState.data
                                                        ];
                                                        data[
                                                            data.indexOf(
                                                                oldData
                                                            )
                                                        ] = newData;
                                                        return {
                                                            ...prevState,
                                                            data
                                                        };
                                                    });
                                                }
                                            });
                                        }
                                    }, 600);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        apis.deleteUserAndProfile(
                                            oldData.emailAddress
                                        ).then((res) => {
                                            if (res.data.success) {
                                                setState((prevState) => {
                                                    const data = [
                                                        ...prevState.data
                                                    ];
                                                    data.splice(
                                                        data.indexOf(oldData),
                                                        1
                                                    );
                                                    return {
                                                        ...prevState,
                                                        data
                                                    };
                                                });
                                            }
                                        });
                                    }, 600);
                                })
                        }}
                    />
                </div>
            );
        }

        function ApplicationList(props) {
            const [state, setState] = React.useState({
                /** Hardcoding user requests */
                columns: props.columns,
                data: props.data
            });

            return (
                <div id="user-list">
                    <MaterialTable
                        options={{ actionsColumnIndex: -1 }}
                        title="User Requests"
                        columns={state.columns}
                        data={state.data}
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        apis.deleteApplicationById(
                                            oldData.applicationId
                                        ).then((res) => {
                                            if (res.data.success) {
                                                setState((prevState) => {
                                                    const data = [
                                                        ...prevState.data
                                                    ];
                                                    data.splice(
                                                        data.indexOf(oldData),
                                                        1
                                                    );
                                                    return {
                                                        ...prevState,
                                                        data
                                                    };
                                                });
                                            }
                                        });
                                    }, 600);
                                })
                        }}
                    />
                </div>
            );
        }

        return (
            <div>
                <div id="admin-tabs">
                    <Grid container justify="center">
                        <Button
                            className="login__button"
                            onClick={(e) => {
                                this.handleOnClick(e);
                            }}
                        >
                            USER LIST
                        </Button>
                        <Button
                            className="login__button"
                            onClick={(e) => {
                                this.handleOnClick(e);
                            }}
                        >
                            APPLICATION LIST
                        </Button>
                    </Grid>
                    <Divider />
                </div>
                <div>
                    {this.state.selectedTab === "USER LIST" && (
                        <UserList
                            columns={this.state.userListColumns}
                            data={this.state.userList}
                        />
                    )}
                    {this.state.selectedTab === "APPLICATION LIST" && (
                        <ApplicationList
                            columns={this.state.applicationListColumns}
                            data={this.state.applicationList}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(UserManagement);
/*
const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });


function UserList (props) {
      
    return (
    <MaterialTable
      title="Editable Example"
      columns={state.column}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}*/
