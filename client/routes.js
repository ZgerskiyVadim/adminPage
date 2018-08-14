import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import Groups from './containers/groupsTablePage';
import GroupPage from './containers/groupPage';
import Users from './containers/usersTablePage';
import UserPage from './containers/userPage';
import HomePage from './containers/homePage';
import LoginPage from './containers/loginPage';
import CreateUser from './containers/createUserPage';
import CreateGroup from './containers/createGroupPage';
import NotFoundPage from './containers/notFoundPage';


export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <PrivateRoute exact path="/users" component={Users}/>
                <PrivateRoute path="/users/:id" component={UserPage}/>
                <PrivateRoute exact path="/groups" component={Groups}/>
                <PrivateRoute path="/groups/:id" component={GroupPage}/>
                <PrivateRoute exact path="/create-user" component={CreateUser}/>
                <PrivateRoute exact path="/create-group" component={CreateGroup}/>
                <Route path="*" component={NotFoundPage} />
            </Switch>
        );
    }
}
