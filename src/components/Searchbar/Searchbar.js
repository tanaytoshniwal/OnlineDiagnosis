import React from 'react'
import './Searchbar.css'
import { Icon, Input, AutoComplete } from 'antd';
import { Container } from 'react-bootstrap';

const { Option, OptGroup } = AutoComplete;
function Searchbar(props) {
    let dataSource = props.symptoms
    let options = dataSource.map((item,index) => <Option key={item.id} value={item.name} onClick={()=>{props.selected(item,index)}}>{item.name}</Option>)
    return (
        <div><Container>
        <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
            <AutoComplete
                className="certain-category-search"
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                size="large"
                style={{ width: '100%' }}
                dataSource={options}
                placeholder="Search Symptoms"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        </div>
        </Container></div>
    )
}

export default Searchbar
