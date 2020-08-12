import React, { Component } from 'react';
// import { Link } from `react-router-dom`;


class Repos extends Component {
    state = { username: "" , profilePic: "", repos: [], repoNames: [], repoDescriptions: [], repoLanguages: [], repoForks: [], repoStars: []};

    render(){
        return (
            <h1>This is where Repos will be displayed</h1>
        );
    };
};

export default Repos;