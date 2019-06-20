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
      age: 0,
      symptoms: [],
      evidence: [],
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
      let local_evidence = {"id": item.id, "choice_id": "present"}
      this.state.evidence.push(local_evidence)
      // console.log(this.state.evidence)
  }
  submit = ()=>{
    console.log('submit')
    if(!this.state.first_hit) {
      this.setState({
        first_hit: true
      })
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
        "evidence": this.state.evidence
      }, {
        headers: header
      }).then(res=>{
        console.log(this.state.first_hit)
        console.log(res.data)
      })
    }
  }
  onSexChanged = (event) => {
    this.setState({
      gender: event.target.value
    })
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
        <Info sex={this.state.gender} gender={this.state.gender} age={this.state.age} onAgeChanged={this.onAgeChanged} onSexChanged={this.onSexChanged} submit={this.submit} />
        <UI symptoms={this.state.symptoms} selected={this.symptomSelected}/>
      </div>
    );
  }
}

export default App;
