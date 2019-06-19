import React from 'react';
import './App.css';
import Info from './components/Info/Info';
class App extends React.Component {
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
