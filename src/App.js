import React from 'react';
import './App.css';
import axios from 'axios';
import Info from './components/Info/Info';
import UI from './components/UI/UI';
import env from './environment';
import Modal from 'react-modal'
import Popup from './components/Popup/Popup';
import Searchbar from './components/Searchbar/Searchbar';

Modal.setAppElement('#root')

class App extends React.Component {
  customStyles = {
    content : {
      backgroundColor : 'rgba(240, 240, 240, .95)',
      minHeight : '50%',
      minWidth: '80%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -35%)'
    }
  };
  api_data = env()
  constructor(){
    super()
    this.state = {
      gender: 'male',
      age: 18,
      symptoms: [],
      evidence: [],
      modalIsOpen: false,
      modalData: undefined
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
  symptomSelected = (item, index)=>{
    this.state.symptoms.splice(index, 1)
    this.setState({symptoms: this.state.symptoms})
    let local_evidence = {"id": item.id, "choice_id": "present"}
    this.state.evidence.push(local_evidence)
  }
  submit = ()=>{
    if(this.state.age === 0) alert('Please Fill the required fields.');
    else if(this.state.evidence.length === 0) alert('Please select atleast one symptom!')
    else{
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
        console.log(res.data)
        this.setState({
          modalData: res.data,
          modalIsOpen: true
        })
      })
    }
  }
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
  click = (choice_id, id)=>{
    this.state.evidence.push({"id": id, "choice_id": choice_id})
    this.setState({modalIsOpen: false})
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
      console.log(res.data)
      this.setState({
        modalData: res.data,
        modalIsOpen: true
      })
    })
  }
  reset = () =>{
    this.setState({
      evidence: []
    })
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
  }
  render(){
    return (
      <div>
        <Info sex={this.state.gender} reset={this.reset} gender={this.state.gender} age={this.state.age} onAgeChanged={this.onAgeChanged} onSexChanged={this.onSexChanged} submit={this.submit} />
        <Searchbar symptoms={this.state.symptoms} selected={this.symptomSelected}></Searchbar>
        <UI symptoms={this.state.symptoms} selected={this.symptomSelected}/>
        <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={this.customStyles}
            contentLabel="Example Modal" >
                <Popup closeModal={this.closeModal} click={this.click} data={this.state.modalData} className="modal"/>
        </Modal>
      </div>
    );
  }
}

export default App;
