import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchForm from './Components/SearchBox/index'
import Repos from './Components/Repos/Repos'
import './App.css';

function App() {
  return (
<Switch>

<Route exact path="/" component={SearchForm} />

<Route exact path="/searchResults" component={Repos} />

</Switch>
  );
}

export default App;

