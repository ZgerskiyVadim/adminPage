import React, { Component } from 'react';
import axios from 'axios';

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            group: {
                name: '',
                title: ''
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`/api/groups/${id}`)
            .then(group => {
                const usersRemoveDublicates = [...new Set(group.data.users.map(user => JSON.stringify(user)))].map(parseUser => JSON.parse(parseUser));

                this.setState({
                users: usersRemoveDublicates,
                group: {
                    name: group.data.name,
                    title: group.data.title
                }
            })})
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>GROUP</h1>
                <h3>name: {this.state.group.name}</h3>
                <h3>title: {this.state.group.title}</h3>
                <h1>Users</h1>
                {
                    this.state.users.map(user =>
                        <div key={user._id}>
                            <h4>username: {user.username}</h4>
                            <h4>firstName: {user.firstName}</h4>
                            <h4>lastName: {user.lastName}</h4>
                            <h4>email: {user.email}</h4>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Group;