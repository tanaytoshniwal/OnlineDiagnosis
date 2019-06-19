import React from 'react'
import { Card, Button } from 'antd';
import '../../../node_modules/antd/dist/antd.css'
import './UI.css'
function UI(props) {
    let card = props.symptoms.map(data=>
        <Card key={data.id} title={data.name} extra={<Button onClick={()=>{props.selected(data)}} type="primary">Select</Button>} className="card">
            <p><strong>Common Name:</strong> {data.common_name}</p>
            <p><strong>Seriousness:</strong> {data.seriousness}</p>
            <p><strong>Sex Filter:</strong> {data.sex_filter}</p>
        </Card>
    );
    return (
        <div>
            {card}
        </div>
    )
}

export default UI
