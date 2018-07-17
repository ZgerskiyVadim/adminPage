import React, { Component } from 'react';
import axios from 'axios';
import './index.scss';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                id: ''
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`/api/users/${id}`)
            .then(user => this.setState({
                groups: user.data.groups,
                user: {
                    username: user.data.user.username,
                    firstName: user.data.user.firstName,
                    lastName: user.data.user.lastName,
                    email: user.data.user.email,
                    id: user.data.user._id
                }
            }))
            .catch(err => console.log(err));
    }

    leaveGroup(id) {
        axios.put(`/api/users/leave-group/${this.state.user.id}`, {groupID: id})
            .then(updatedGroup => {
                const newState = this.state.groups.filter(group => group._id !== updatedGroup.data._id);
                this.setState({groups: newState});
            })
            .catch(err => console.log('err', err));
    }

    render() {
        return (
            <div>
               <h1>USER</h1>
                <h3>username: {this.state.user.username}</h3>
                <h3>firstName: {this.state.user.firstName}</h3>
                <h3>lastName: {this.state.user.lastName}</h3>
                <h3>email: {this.state.user.email}</h3>
                <h1>Groups</h1>
                {
                    this.state.groups.map(group =>
                        <div className='user' key={group._id}>
                            <div>
                                <h4>name: {group.name}</h4>
                                <h4>title: {group.title}</h4>
                            </div>
                            <button onClick={this.leaveGroup.bind(this, group._id)}>leave group</button>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default User;