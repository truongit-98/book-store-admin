import React, { Component } from 'react';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import actions from "../../redux/actions/setting_data/index"

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />

);

class SearchBar extends Component {
  handleOnChange = (target)=>{
    this.props.searchCoin(target.currentTarget.value)
    // console.log(target.currentTarget.value)
  }
  render() {
    return (
      <div style={{ width: '85%' }}>
        <Search
          placeholder="Tìm kiếm"
          onSearch={(value) => console.log(value)}
          onChange={this.handleOnChange}
          style={{ width: 200 }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
     searchCoin: (coin) =>{
       dispatch(actions.searchCoin(coin));
     }
});
export default connect(null,mapDispatchToProps)(SearchBar);
