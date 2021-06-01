import React, { Component } from 'react';
import { Select } from 'antd';
import AddCoinBtnComponent from './AddCoinBtnComponent';
// import Search from './Search'
import AttributeTable from './CoinTableComponent';
import SearchBar from './SearchBar';

const { Option } = Select;

class CoinSettingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: 'ETH',
    };
  }

  handleChange = (coin) => {
    this.props.selectCoin(coin);
    this.setState({coin:coin})
  }

  renderCoin = () => {
    return window._.map(this.props.arrCoins, (coin) => <Option value={coin.symbol}>
      {coin.symbol}
    </Option>)
  }

  render() {
    return (
      <div style={{ marginTop: '20px', marginLeft: '50px', marginRight: '50px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '10%' }}>
            <Select
              defaultValue=""
              style={{ width: 100 }}
              onChange={this.handleChange}
            >
              <Option value={''}>
                Tất cả
              </Option>)
              {this.renderCoin()}
            </Select>

          </div>
          <SearchBar />
          <AddCoinBtnComponent />
        </div>
        <div style={{ marginTop: '20px' }}>
          <AttributeTable />
        </div>
      </div>
    );
  }
}

export default CoinSettingComponent;
