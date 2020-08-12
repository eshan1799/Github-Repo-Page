import React, { Component } from 'react';
// import { Link } from `react-router-dom`;
import './style.css';
import Repos from '../Repos/Repos'

class SearchForm extends Component {
    state = { username: "" , profilePic: "", repoNames: [], repoDescriptions: [], repoLanguages: [], repoForks: [], repoStars: []};

    handleSubmit = e => {
        e.preventDefault();
        fetch(`https://api.github.com/users/${this.state.username}/repos`)
        .then(res => res.json())
        .then((data) => {
            // this.setState({ repos: data })
            this.setState( { profilePic: data[0].owner.avatar_url})
            this.setState( { repoNames: data.map(repo => repo.name) })
            this.setState( { repoDescriptions: data.map(repo => repo.description) })
            this.setState( { repoLanguages: data.map(repo => repo.language) })
            this.setState( { repoForks: data.map(repo => repo.forks_count) })
            this.setState( { repoStars: data.map(repo => repo.stargazers_count) })
            console.log(this.state)
        })
        .catch(console.log)
    }

    handleChange = e => {
        const value = e.target.value;
        this.setState({ username : value})
    }

    render(){
        return (
            <section>
                <form id='userForm' onSubmit={this.handleSubmit}>
                    <input id='usernameSearch' type="text" value={this.state.username} onChange={this.handleChange} placeholder='Enter Github username' autoFocus={true} />
                    {/* <Link to="/searchResults"> */}
                        <input id='submit' type="submit" value="Search repos" />
                    {/* </Link> */}
                </form>
                <Repos state = "this.state"/>
            </section>
        );
    };
};

export default SearchForm;