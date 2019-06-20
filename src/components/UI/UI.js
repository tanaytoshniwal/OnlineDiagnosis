import React from 'react'
import { Card, Button, List } from 'antd';
import '../../../node_modules/antd/dist/antd.css'
import './UI.css'
function UI(props) {
    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: page => {
                    //console.log(page);
                },
                pageSize: 3,
                }}
                dataSource={props.symptoms}
                footer={
                <div>
                    <p align="center">Designed with <span className="red">&hearts;</span> by TDC</p>
                </div>
                }
                renderItem={(data, index) => (
                    <Card key={data.id} title={data.name} extra={<Button onClick={()=>{props.selected(data, index)}} type="primary">Select</Button>} className="card">
                        <p><strong>Common Name:</strong> {data.common_name}</p>
                        <p><strong>Seriousness:</strong> {data.seriousness}</p>
                        <p><strong>Sex Filter:</strong> {data.sex_filter}</p>
                    </Card>
                )}/>
        </div>
    )
}

export default UI
