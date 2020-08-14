import React, { Component } from 'react';
import {withRouter } from 'react-router-dom';
// import AnchorLink from 'react-anchor-link-smooth-scroll';
import './style.css';
// import Repos from '../Repos/Repos'

class SearchForm extends Component {
    state = { username: "" , usernameInput: "", display: false, profilePic: "", profileUrl: "", repoNames: [], repoURLs: [], repoDescriptions: [], repoLanguages: [], repoForks: [], repoStars: []};

    handleSubmit = e => {
        e.preventDefault();
        this.setState( { username: `${this.state.usernameInput}`, display: true }, () => {
            fetch(`https://api.github.com/users/${this.state.username}/repos`)
            .then(res => res.json())
            .then((data) => {
                this.setState( { profilePic: data[0].owner.avatar_url})
                this.setState( { profileUrl: data[0].owner.html_url})
                this.setState( { repoNames: data.map(repo => repo.name) })
                this.setState( { repoURLs: data.map(repo => repo.html_url) })
                this.setState( { repoDescriptions: data.map(repo => repo.description) })
                this.setState( { repoLanguages: data.map(repo => repo.language) })
                this.setState( { repoForks: data.map(repo => repo.forks_count) })
                this.setState( { repoStars: data.map(repo => repo.stargazers_count) })
                this.setState( { usernameInput: '' })
                document.getElementById("usernameSearch").focus();
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
            <h3><a target="_blank" href={this.state.repoURLs[i]}>{this.state.repoNames[i]}</a></h3>
            <p>Description: {this.state.repoDescriptions[i]}</p>
            <p>Languages: {this.state.repoLanguages[i]}</p>
            <p>
                <span className='fork'>&#x2442;</span>
                <span className='text'> - {this.state.repoForks[i]}</span>
            </p>
            <p>
                <span className='star'>&#9733;</span>
                <span className='text'> - {this.state.repoStars[i]}</span>
            </p>
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
                <section id='repoHeader'>
                    <h1 id='username'><a target='_blank' href={this.state.profileUrl}>{this.state.username}</a></h1>
                    <img src={this.state.profilePic} />
                    <p>Repos: {this.state.repoNames.length}</p>
                </section>
                    { items }
                </section>
            </main>
        );
    };
};

export default withRouter(SearchForm);