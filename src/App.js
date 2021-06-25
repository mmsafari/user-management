import React, { Component } from 'react';
import './App.css';
import UserManagement from './components/userManagement';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserManagement />
      </div>
    );
  }
}

export default App;
