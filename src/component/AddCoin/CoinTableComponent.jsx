import React, { Component } from 'react';
import { Space, Table } from 'antd';
import { connect } from 'react-redux';
import { FaPencilAlt } from 'react-icons/fa';
import utils from '../../common/utils';
import PopupAddCoins from './PopupAddCoins';

const LEVEL_DEFAULT = '1';

class CoinTableComponent extends Component {
  getColumns = (limits) => {
    return [
      {
        align: "center",
        title: "Đồng",
        dataIndex: "coin",
        key: "coin",
        width: "17%",
        render: (coin, item) => {
          return <div style={{display: "flex",  justifyContent: "center"}}>
            <div style={{width: "40%", textAlign: "-webkit-right"}}>
              <div style={{backgroundImage: `url(${item.icon_image})`, height: '24px',
                width: '24px',
                backgroundSize: 'contain',
                marginRight: "20px",
                display: 'block',
                backgroundRepeat: 'no-repeat'}} alt={coin}></div>

            </div>
            <div style={{width: "60%", textAlign: "left", fontWeight: "bold"}}>{coin}</div>
          </div>
        }
      },
      {
        align: "center",
        title: "Tên đầy đủ",
        dataIndex: "name",
        key: "name",
      },
      {
        align: "center",
        title: "Mạng",
        dataIndex: "type",
        key: "type",
      },
      {
        align: "center",
        title: "Phí nạp",
        dataIndex: "depositFee",
        key: "depositFee",
        render: () => <div>Miễn Phí</div>
      },
      {
        align: "center",
        title: "Phí rút",
        dataIndex: "symbol",
        key: "symbol",
        render: (symbol, coin) => {
          coin.fee = limits[`${symbol}:${LEVEL_DEFAULT}`]?.fee ?? 0;
          return (<div>{utils.formatCurrency(coin.fee)}</div>)
        }
      },
      {
        align: "center",
        title: "Ghi chú",
      },
      {
        align: "center",
        title: "Địa chỉ",
        dataIndex: 'contract_address',
        render: (addr) => <div className='ellipsis w-180' title={addr}>
          {addr}
        </div>
      },
      {
        align: "center",
        title: "Lượng rút tối thiểu",
        dataIndex: "symbol",
        key: "symbol",
        render: (symbol, coin) => {
          coin.minimum_withdrawal = limits[`${symbol}:${LEVEL_DEFAULT}`]?.minimum_withdrawal ?? '';
          return (<div>{utils.formatCurrency(coin.minimum_withdrawal)}</div>)
        }
      },
      {
        align: "center",
        title: "Lỗi mã giao dịch",
        dataIndex: 'transaction_tx_path',
      },
      {
        align: "center",
        title: "Xem giao dịch tại",
        dataIndex: 'transaction_explorer',
      },
      {
        align: "center",
        title: "Hành động",
        key: "action",
        render: (item,row) => (
          <Space size="middle">
            <FaPencilAlt className="styled-icon" onClick={async ()=>{
              this.changePopup();
              await this.setState({rowUpdate:row});
              }} />
          </Space>
        ),
      },
    ];
  }

  constructor(props) {
    super(props);
    this.state={
      rowUpdate: {},
      isVisible: false
    }
  }

  changePopup = async () =>{
    await this.setState({
      isVisible: true
    })
  }

  closePopup = async (isVisible) =>{
    await this.setState({
      isVisible,
    })
  }
  

  render() {
    return (
      <div>
        <Table dataSource={this.props.selectionCoin || []} columns={this.getColumns(this.props.limits)} bordered />
        
        <PopupAddCoins isVisible={this.state.isVisible} closePopup={this.closePopup} rowUpdate={this.state.rowUpdate}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  limits: state.setting.limitWithdrawals,
  arrCoins: state.setting.arrCoins,
  selectionCoin: state.setting.selectionCoin,

});

export default connect(mapStateToProps, null)(CoinTableComponent);
