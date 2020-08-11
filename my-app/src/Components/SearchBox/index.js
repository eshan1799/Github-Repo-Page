import React, { Component } from 'react';
import './style.css';

class SearchForm extends Component {
    state = { username: "" };

    handleSubmit = e => {
        e.preventDefault();
        this.props.getResult(this.state.username);
    }

    handleChange = e => {
        const value = e.target.value;
        this.setState({ username : value})
        console.log(value);
    }

    render(){
        return (
            <section>
                <form id='userForm' onSubmit={this.handleSubmit}>
                    <input id='usernameSearch' type="text" value={this.state.username} onChange={this.handleChange}/>
                    <input id='submit' type="submit" value="Search repos" />
                </form>
            </section>
        );
    };
};

export default SearchForm;