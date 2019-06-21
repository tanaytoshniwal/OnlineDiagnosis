import React from 'react'
import {Button} from 'react-bootstrap'
import './Popup.css'
function Popup(props) {
    let buttons = props.data.question.items[0].choices.map((data, index)=>
        <Button variant="outline-info" onClick={()=>{props.click(data.id, props.data.question.items[0].id)}} key={data.id} className="mx-3 choice">
            {data.label}
        </Button>
    )
    return (
        <div className="container">
            <div className="row justify-content-end">
                <button className="btn btn-outline-danger ml-auto" onClick={props.closeModal}>X</button>
            </div>
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
