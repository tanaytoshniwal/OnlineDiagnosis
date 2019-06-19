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
      evidence: []
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
  symptomSelected = (data)=>{
    console.log(data)
    if(this.state.evidence.length == 0) this.getDiagnosis(data)
  }
  getDiagnosis = (item)=>{
    let header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "App-Id": this.api_data.id,
      "App-Key": this.api_data.key,
      "Dev-Mode" : "true"
    }
    let evidence = []
    if(this.state.evidence.length == 0){
      evidence.push({
        "id": item.id,
        "choice_id": "present"
      })
    }
    else{
      // TODO
    }
    this.setState({
      evidence: evidence
    })
    let header_2 = {
      "sex": this.state.gender,
      "age": this.state.age,
      "evidence": this.state.evidence
    }
    axios.post('https://api.infermedica.com/v2/diagnosis', {
      "sex": this.state.gender,
      "age": this.state.age,
      "evidence": this.state.evidence
    }, {
      headers: header
    }).then(res=>{
      console.log(res.data)
      console.log(evidence)
    })
  }
  render(){
    return (
      <div>
        <Info sex={this.state.gender} age={this.state.age} />
        <UI symptoms={this.state.symptoms} selected={this.symptomSelected}/>
      </div>
    );
  }
}

export default App;
