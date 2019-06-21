import React from 'react'
import {Button, Alert, Badge} from 'react-bootstrap'
import './Popup.css'
function Popup(props) {
    let buttons = props.data.question.items[0].choices.map((data, index)=>
        <Button variant="outline-info" onClick={()=>{props.click(data.id, props.data.question.items[0].id)}} key={data.id} className="mx-3 my-2 choice">
            {data.label}
        </Button>
    )
    let conditions = props.data.conditions.map((data, index)=>
        <Badge className="m-1" variant="secondary" key={data.id}>{data.common_name} | {parseFloat(data.probability*100).toFixed(1)}%</Badge>
    )
    return (
        <div className="container">
            <div className="row justify-content-end">
                <button className="btn btn-outline-danger ml-auto" onClick={props.closeModal}>X</button>
            </div>
            <Alert variant='danger' className="row h5 mt-2">
                <div className="h4">You are diagnosed with:</div>
                {conditions}
            </Alert>
            <div className="row h2">
                {props.data.question.text}
            </div>
            <div className="row mt-5 justify-content-around">
                {buttons}
            </div>
        </div>
    )
}

export default Popup
