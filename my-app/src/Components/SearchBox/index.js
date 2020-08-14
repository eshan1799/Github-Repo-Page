import React, { Component } from 'react';
import {withRouter } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './style.css';
import Repos from '../Repos/Repos'

class SearchForm extends Component {
    state = { username: "" , usernameInput: "", display: false, profilePic: "", repoNames: [], repoDescriptions: [], repoLanguages: [], repoForks: [], repoStars: []};

    handleSubmit = e => {
        e.preventDefault();
        this.setState( { username: `${this.state.usernameInput}`, display: true }, () => {
            console.log(this.state.display)
            fetch(`https://api.github.com/users/${this.state.username}/repos`)
            .then(res => res.json())
            .then((data) => {
                this.setState( { profilePic: data[0].owner.avatar_url})
                this.setState( { repoNames: data.map(repo => repo.name) })
                this.setState( { repoDescriptions: data.map(repo => repo.description) })
                this.setState( { repoLanguages: data.map(repo => repo.language) })
                this.setState( { repoForks: data.map(repo => repo.forks_count) })
                this.setState( { repoStars: data.map(repo => repo.stargazers_count) })
                document.getElementById("usernameSearch").value = "";
            })
            .catch(console.log)
        })

    }

    handleChange = e => {
        const value = e.target.value;
        this.setState({ usernameInput: value})
    }

    render(){
        
        const items = []
        for (let i=0; i< this.state.repoNames.length; i++) {

            items.push(
            <div id='repoInfo' key={i}>
            <h3 className = 'repo repoName'>{this.state.repoNames[i]}</h3>
            <p className = 'repo repoText'>Description: {this.state.repoDescriptions[i]}</p>
            <p className = 'repo repoText'>Languages: {this.state.repoLanguages[i]}</p>
            <p className = 'repo repoNumbers'>Forks: {this.state.repoForks[i]}</p>
            <p className = 'repo repoNumbers'>Stars: {this.state.repoStars[i]}</p>
            </div>
            );
        }
        
        return (
            <main>
            <form id='userForm' onSubmit={this.handleSubmit}>
                <input id='usernameSearch' type="text" value={this.state.usernameInput} onChange={this.handleChange} placeholder='Enter Github username' autoFocus={true} />
                <input id='submit' type="submit" value="Search repos" />
            </form>
            <section style={{display: `${this.state.display ? 'flex': 'none'}`}} id='displayRepos'>
                <h1>{this.state.username}</h1>
                <img src={this.state.profilePic} />
                <p>Repos: {this.state.repoNames.length}</p>
                { items }
            </section>
            </main>
        );
    };
};

export default withRouter(SearchForm);