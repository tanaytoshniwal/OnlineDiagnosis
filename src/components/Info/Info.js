import React from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import './Info.css'
function Info(props) {
    return (
        <div>
            <Container>
                <div className="row my-2">
                    <div className="col col-2">
                        <Form.Label>Select Gender:</Form.Label>
                    </div>
                    <div className="col">
                        <div>
                            <Form.Check type="radio" checked={props.gender === "male"} onChange={props.onSexChanged} name="gender" value="male" label="Male" />
                        </div>
                        <div>
                            <Form.Check type="radio" checked={props.gender === "female"} onChange={props.onSexChanged} name="gender" value="female" label="Female" />
                        </div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col col-2">
                        <Form.Label>Enter Age:</Form.Label>
                    </div>
                    <div className="col">
                        <Form.Control type="number" onChange={props.onAgeChanged} placeholder="Enter Age" value={props.age} />
                    </div>
                </div>
                <div className="row my-2 justify-content-around">
                    <Button onClick={()=>{props.submit()}} type="primary" className="full mx-3">Submit</Button>
                    <Button onClick={()=>{props.reset()}} type="primary" className="full mx-3">Reset</Button>
                </div>
            </Container>
        </div>
    )
}

export default Info
