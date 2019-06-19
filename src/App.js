import React from 'react';
import './App.css';
import Info from './components/Info/Info';
class App extends React.Component {
  url = 'https://api.infermedica.com/v2/';
  headers = {
    "Content-Type": "application/json",
    "App-Key": "e8f81759888e6e92cb78e9beccb333ad",
    "App-Id":"0bdf6dc0"
  };
  constructor(){
    super()
    this.state = {
      gender: '',
      age: -1,
      
    }
  }
  render(){
    return (
      <div>
        <Info />
      </div>
    );
  }
}

export default App;
