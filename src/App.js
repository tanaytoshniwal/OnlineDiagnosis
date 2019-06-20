import React from 'react';
import './App.css';
import axios from 'axios';
import Info from './components/Info/Info';
import UI from './components/UI/UI';
import env from './environment';
class App extends React.Component {
  api_data = env()
  constructor(){
    super()
    this.state = {
      gender: 'male',
      age: 21,
      symptoms: [],
      first_hit: false
    }
  }
  componentDidMount(){
    this.getSymptoms();
  }
  getSymptoms = ()=>{
    let header = {
      "Accept": "application/json",
      "App-Key": this.api_data.key,
      "App-Id" : this.api_data.id,
      "Dev-Mode" : "true"
    };
    axios.get('https://api.infermedica.com/v2/symptoms', {headers: header}).then(res=>{
      this.setState({
        symptoms: res.data
      })
    });
  }
  symptomSelected = (item)=>{
    console.log(item)
    if(!this.state.first_hit) {
      this.setState({
        first_hit: true
      })
      let local_evidence = [{"id": item.id, "choice_id": "present"}]
      let header = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "App-Id": this.api_data.id,
        "App-Key": this.api_data.key,
        "Dev-Mode" : "true"
      }
      axios.post('https://api.infermedica.com/v2/diagnosis', {
        "sex": this.state.gender,
        "age": this.state.age,
        "evidence": local_evidence
      }, {
        headers: header
      }).then(res=>{
        console.log(this.state.first_hit)
        console.log(res.data)
      })
    }
  }
  submit = ()=>{
    console.log('submit')
  }
  onSexChanged = (event) => {
    if(this.state.gender !== event.target.value){
    this.setState({
      gender: event.target.value
    })
    console.log(this.state.gender)
  }
  }
  onAgeChanged = (event) => {
    this.setState({
      age: event.target.value
    })
    console.log(this.state.age)
  }
  render(){
    return (
      <div>
        <Info sex={this.state.gender} age={this.state.age} submit={this.submit} />
        <UI symptoms={this.state.symptoms} selected={this.symptomSelected}/>
      </div>
    );
  }
}

export default App;
