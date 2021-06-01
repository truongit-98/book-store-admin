import React, { Component } from "react";
import { Table, Input, Select, Space, Form, Modal, Button } from "antd";
import { FaPencilAlt } from "react-icons/fa";
import _ from 'lodash'
import utils from '../common/utils';

const { Option } = Select;
const ALL = 'ALL';
const LEVEL_DEFAULT = '1';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 16,
    span: 8,
  },
};

class TransactionFee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinName: ALL,
      visible: false,
      coin: {},
  }
}

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
            coin.fee = limits[`${symbol}:${LEVEL_DEFAULT}`]?.fee ?? '';
              return (<div>{utils.formatCurrency(coin.fee)}</div>)
          }
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
          title: "Hành động",
          key: "action",
          render: (item) => (
            <Space size="middle">
              <FaPencilAlt className="styled-icon" onClick={() => this.showModalDetail(item)} />
            </Space>
          ),
        },
      ];
  }



  showModalDetail = (item) => {
    this.setState({
      visible: true,
      coin: {...item},
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };



  onFilterCoin = (coinName) =>{
    this.setState({coinName})
  }

  showOption = () => {
      return _.map(this.props.arrCoins || [], (item, index) => {
        return (
          <Option
            key={index}
            value={item.coin}
          >
            {item.coin}
          </Option>
        );
      });
}

  getData = () => {
    if (this.state.coinName === ALL) {
      return this.props.arrCoins || [];
    }
    return this.props.coins[this.state.coinName] ? [this.props.coins[this.state.coinName]]: [];
  }


  onSubmit = () => {
    const {coin} = this.state;
    coin.minimum_withdrawal = parseFloat(coin.minimum_withdrawal)
    coin.fee = parseFloat(coin.fee)
    coin.security_level = 1;
    coin.currency = coin.symbol;
    this.props.onChangeTransactionFeeAction(coin)
    this.handleCancel()
  };

  onChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
        coin: {...this.state.coin, [name]: value},
    });
}

  render() {
    const { visible, coin  } = this.state;
    const { Option } = Select;

    return (
      <div className="withdrawalHistory">
        <h3> Phí nạp rút </h3>
        <div className="transaction">
          <span style={{ marginRight: 8 }}> Đồng: </span>
          <Select defaultValue={ALL}
            style={{ width: 90, marginRight: 14 }}
            onChange={this.onFilterCoin}
           >
            <Option value={ALL}>Tất cả</Option>
            {this.showOption()}
          </Select>
        </div>
        <Table  columns={this.getColumns(this.props.limits)}
            dataSource={this.getData() || []}
        bordered />
        <Modal
          title= "Sửa thông tin coin"

          visible={visible}
          footer={null}

          onCancel={this.handleCancel}
        >
          <Form {...layout}>
            <Form.Item label="Đồng">
              <Input  defaultValue={coin.coin} disabled/>
            </Form.Item>
            <Form.Item label="Tên đầy đủ">
              <Input value={coin.name} disabled/>
            </Form.Item>
            <Form.Item label="Phí nạp">
              <Input value="Miễn Phí" disabled/>
            </Form.Item>
            <Form.Item label="Phí rút">
              <Input type="text" name="fee" value={coin.fee} onChange={this.onChange}/>
            </Form.Item>
            <Form.Item label="Lượng rút tối thiểu">
              <Input type="text" name="minimum_withdrawal" value={coin.minimum_withdrawal} onChange={this.onChange}/>
            </Form.Item>
            <Form.Item {...tailLayout} style={{ marginBottom: "12px" }}>
              <Button
                type="primary"
                onClick={this.handleCancel}
                style={{ width: "64px" }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit"  style={{ marginLeft: 12, width: "64px" }} onClick={this.onSubmit}>
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default TransactionFee;
