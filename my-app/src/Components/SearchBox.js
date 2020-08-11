import React, { Component } from 'react';

class SearchForm extends Component {
    state = { username: "" };

    handleSubmit = e => {
        e.preventDefault();
        this.props.getResult(this.state.location);
    }


    handleChange = e => {
        const value = e.target;
        this.setState({ location : value})
        console.log(value);
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.location} onChange={this.handleChange}/>
                <input type="submit" value="Search" />
            </form>
        );
    };
};

export default SearchForm;

