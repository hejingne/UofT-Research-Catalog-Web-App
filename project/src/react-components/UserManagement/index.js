import React, {useState} from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import MaterialTable from 'material-table';

import "./styles.css";


class UserManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // connect to db to fetch and use this.setState() to update info
    }

    handleOnClick(e) {
        this.setState({selectedTab: e.target.innerText})
    }

    render() {
        function UserList (props) {
            const [state, setState] = React.useState({
            /** Hardcoding user list */
                columns: [
                    { title: 'User Name', field: 'username' },
                    { title: 'Email', field: 'email' },
                    { title: 'User Type', field: 'usertype' }
                ],
                data: [{ username: 'Mike Oreo', email: 'user', usertype: "Student" },
                    { username: 'Mike Oreo', email: 'user2', usertype: "Researcher" }
                ]
            });

            return (
                <div id="user-list">
                    <MaterialTable options={{ actionsColumnIndex: -1 }} title="User List" columns={state.columns} data={state.data} editable={{ onRowAdd: newData => new Promise(resolve => {
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
            </div>
          );
          
        }

        function UserRequest (props) {
            const [state, setState] = React.useState({
            /** Hardcoding user requests */
                columns: [
                    { title: 'User Name', field: 'username' },
                    { title: 'Email', field: 'email' },
                    { title: 'User Type', field: 'usertype' },
                    { title: 'request', field: 'request'}
                ],
                data: [{ username: 'Mike Oreo', email: 'user', usertype: "Student", request: "Change Password" }],
            });

            return (
                <div id="user-list">
                    <MaterialTable options={{ actionsColumnIndex: -1 }} title="User Requests" columns={state.columns} data={state.data} editable={{
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
                    <Button className="login__button" onClick={(e) => {
                        this.handleOnClick(e)
                    }}>USER LIST</Button>
                    <Button className="login__button" onClick={(e) => {
                        this.handleOnClick(e)
                    }}>USER REQUESTS</Button>
                </Grid>
                <Divider/>
                </div>
                <div>
                    {this.state.selectedTab === "USER LIST" && <UserList columns={this.state.userListColumns} data={this.state.userList}/>}
                    {this.state.selectedTab === "USER REQUESTS" && <UserRequest columns={this.state.userRequestColumns} data={this.state.userRequestList}/>}
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