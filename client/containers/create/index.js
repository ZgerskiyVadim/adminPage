import React, { Component } from 'react';
import axios from 'axios';
import './index.scss';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
            },
            group: {
                name: '',
                title: ''
            }
        };

        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeGroup = this.onChangeGroup.bind(this);
        this.sendUser = this.sendUser.bind(this);
        this.sendGroup = this.sendGroup.bind(this);
    }

    onChangeUser(event) {
        const {value, name} = event.target;
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        });
    }

    onChangeGroup(event) {
        const {value, name} = event.target;
        this.setState({
            group: {
                ...this.state.group,
                [name]: value
            }
        });
    }

    sendUser() {
        axios.post('/api/users', this.state.user)
            .then(user => {
                this.setState({
                    user: {
                        ...this.state.user,
                        username: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                    }
                });
            });
    }

    sendGroup() {
        axios.post('/api/groups', this.state.group)
            .then(group => {
                this.setState({
                    group: {
                        ...this.state.group,
                        name: '',
                        title: ''
                    }
                });
            })
    }

    render() {
        return (
            <div className='create'>
                <h2>Create User</h2>
                <div className='create-row'>
                    <div>
                        <h3>username</h3>
                        <input  onChange={this.onChangeUser} value={this.state.user.username} name='username' className='form-control' type="text"/>
                        <h3>firstName</h3>
                        <input  onChange={this.onChangeUser} value={this.state.user.firstName} name='firstName' className='form-control' type="text"/>
                        <h3>lastName</h3>
                        <input  onChange={this.onChangeUser} value={this.state.user.lastName} name='lastName' className='form-control' type="text"/>
                        <h3>email</h3>
                        <input  onChange={this.onChangeUser} value={this.state.user.email} name='email' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.sendUser} className='create-send btn btn-outline-primary'>Send</button>
                </div>
                <h2>Create Group</h2>
                <div className='create-row'>
                    <div>
                        <h3>name</h3>
                        <input  onChange={this.onChangeGroup} value={this.state.group.name} name='name' className='form-control' type="text"/>
                        <h3>title</h3>
                        <input  onChange={this.onChangeGroup} value={this.state.group.title} name='title' className='form-control' type="text"/>
                    </div>

                    <button onClick={this.sendGroup} className='create-send btn btn-outline-primary'>Send</button>
                </div>
            </div>
        );
    }
}

export default Create;