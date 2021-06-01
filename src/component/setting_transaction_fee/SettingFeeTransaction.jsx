import React, { Component } from "react";
import { Table, Input, Select, Space, Form, Modal, Button } from "antd";
import { FaPencilAlt, FaBan,  } from "react-icons/fa";
import _ from 'lodash'
import { MdAddCircle } from "react-icons/md";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const ALL = 'ALL';
const { confirm } = Modal;

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

class SettingFeeTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinName: ALL,
      visible: false,
      coin: {},
      isAddNew: false,
      pair: {},
      pair1: 'Coin',
      pair2: 'Currency',
      precision_quantity: '',
      precision_amount: '',
      precision: '',
    }
  }



  getColumns = (limits) => {
    return [
      {
        align: "center",
        title: "Thị trường",
        dataIndex: "pair",
        key: "pair",
      },
      {
        align: "center",
        title: "Phí",
        dataIndex: "fee",
        key: "fee",
      },
      {
        align: "center",
        title: "Lượng giao dịch tối thiểu",
        dataIndex: "minimum_quantity",
        key: "minimum_quantity",
      },
      {
        align: "center",
        title: "Phần thập phân",
        dataIndex: "precision",
        key: "precision",
        render: (precision) => 
          <div>{`${precision} số thập phân`}</div>
      },
      {
        align: "center",
        title: "Hành động",
        key: "action",
        render: (item) => (
          <Space size="middle">
            <FaPencilAlt className="styled-icon" onClick={() => this.showModalDetail(item)} />
            <FaBan className="styled-icon" onClick={this.showModalBan} />
          </Space>
        ),
      },
    ];
  }
  
  showModalDetail = (item) => {
    this.setState({
      visible: true,
      coin: { ...item },
      pair1: item.coin,
      pair2: item.currency,
      isAddNew: false,
      precision: item.precision,
      precision_quantity: item.minimum_quantity_precision,
      precision_amount: item.minimum_amount_precision,
    });
  };

  showModalAdd = () => {
    this.setState({
      visible: true,
      isAddNew: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.setState({ precision_quantity: '', precision_amount: '', precision: ''})
  };

  onFilterCoin = (coinName) => {
    this.setState({ coinName })
  }


  showOption = () => {
    return _.map(this.props.coinSettings || [], (item, index) => {
      return (
        <Option
          key={index}
          value={item.pair}
        >
          {item.pair}
        </Option>
      );
    });
  }

  showPrecision = () => {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    return arr.map((item, index) => {
      return (
        <Option
          key={index}
          value={item}
        >
          {`${item} số thập phân `}
        </Option>
      )
    })
  }

  showCoin = () =>{
    return _.map(_.values(this.props.coins) || [], (item, index) => {
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
      return [...this.props.coinSettings] || [];
    }
    return this.props.objCoinSettings[this.state.coinName] ? [this.props.objCoinSettings[this.state.coinName]] : [];
  }


  onSubmit = () => {
    const { coin } = this.state;
    coin.minimum_quantity = parseFloat(coin.minimum_quantity);
    coin.minimum_amount = parseFloat(coin.minimum_amount);
    coin.fee = parseFloat(coin.fee);
    coin.minimum_quantity_precision = Math.pow(10, -this.state.precision_quantity);
    coin.minimum_amount_precision = Math.pow(10, -this.state.precision_amount);
    coin.precision = Math.pow(10, -this.state.precision);
    if (this.state.isAddNew) {
      this.props.onCreateMarket({
        ...coin,
        coin: this.state.pair1,
        currency: this.state.pair2,
      });
    } else {
      this.props.onChangeSettingFeeTransactionAction({
        ...coin,
        coin: this.state.pair1,
        currency: this.state.pair2,

      });
    }
    this.handleCancel();
  };

  onChange1 = (event) => {
      this.setState({
        pair1: event
      }, () => {console.log(this.state.pair1)});
    }

  onChange2 = (event) => {
      this.setState({
        pair2: event,
      }, () => {console.log(this.state.pair2)});
    }

  onChange = (event) => {
    if (event.target) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        coin: { ...this.state.coin, [name]: value },
      });
    }
  }
  
  onChangePrecisionQuantity = (value) => this.setState({ precision_quantity: value });
  onChangePrecisionAmount = (value) => this.setState({ precision_amount: value });
  onChangePrecision = (value) => this.setState({ precision: value });

  showModalBan = () => {
    confirm({
      title: 'Bạn có chắc chắn muốn cấm người dùng này không ?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      okText: 'Cấm',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  

  render() {
    const { visible, coin, isAddNew, pair1, pair2  } = this.state;
    const { Option } = Select;
    return (
      <div className="withdrawalHistory" >
        <h3> Quản lý giao dịch </h3>
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <div className="transaction">
            <span style={{ marginRight: 8 }}> Đồng: </span>
            <Select defaultValue={ALL}
              style={{ width: 120, marginRight: 14 }}
              onChange={this.onFilterCoin}
            >
              <Option value={ALL}>Tất cả</Option>
              {this.showOption()}
            </Select>
          </div>
          <div>
            <Button style={{ display: "flex" }} onClick={this.showModalAdd}
            >
              <MdAddCircle size="20" className="styled-icon" />
              <span style={{ marginLeft: 4 }}> Thêm thị trường </span>
            </Button>
          </div>
        </div>
        <Table columns={this.getColumns()}
          dataSource={this.getData()}
          bordered />
        <Modal
          title={
            isAddNew ? 'Thêm quản lý thị trường' : 'Sửa quản lý thị trường'
          }
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
          width={600}
        >
          {isAddNew ?
            (<Form {...layout}>
              <div style={{ display: "flex", justifyContent: 'space-evenly', alignItems: "center", marginBottom: 20 }}>
                  <div><span className="bold">Đồng</span><Select style={{ width: 130, marginLeft: 10 }} onChange={this.onChange1}>{this.showCoin()}</Select></div>
                  <div><span className="bold">Tiền</span><Select style={{ width: 130, marginLeft: 10  }} onChange={this.onChange2}>{this.showCoin()}</Select></div>
               </div>
              <Form.Item label="Thị trường" labelAlign={'left'}>
                  <div>
                    { pair1 !== pair2 ?
                      <span>{`${pair1} / ${pair2}`}</span>
                    : <span> Đồng không được trùng với tiền </span>
                    }
                  </div>
              </Form.Item>
              <Form.Item label="Phí" labelAlign={'left'}>
                <Input type="text" name='fee' value={coin.fee} onChange={this.onChange} />
              </Form.Item>
              <Form.Item label="Lượng giao dịch tối thiểu" labelAlign={'left'}>
                <Input type="text" name="minimum_quantity" value={coin.minimum_quantity} onChange={this.onChange} />
              </Form.Item>
              <Form.Item label="Tổng giao dịch tối thiểu" labelAlign={'left'}>
                <Input type="text" name="minimum_amount" value={coin.minimum_amount} onChange={this.onChange} />
              </Form.Item>
  
              <Form.Item label="Phần thập phân" labelAlign={'left'} value={this.state.precision}>
                <Select name="precision" onChange={this.onChangePrecision} value={this.state.precision}>
                  {this.showPrecision()}
                </Select>
              </Form.Item>
              <Form.Item label="Phần thập phân số lượng" labelAlign={'left'}>
                <Select name="minimum_quantity_precision" onChange={this.onChangePrecisionQuantity} value={this.state.precision_quantity}>
                  {this.showPrecision()}
                </Select>
              </Form.Item>
              <Form.Item label="Phần thập phân tổng" labelAlign={'left'}>
                <Select name="minimum_amount_precision" onChange={this.onChangePrecisionAmount} value={this.state.precision_amount}>
                  {this.showPrecision()}
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout} style={{ marginBottom: "12px" }} className="text-right">
                <Button
                  type="primary"
                  onClick={this.handleCancel}
                  style={{ width: "64px" }}
                >
                  Hủy
            </Button>
            {pair1 !== pair2 ?
              (<Button type="primary" htmlType="submit" style={{ marginLeft: 12, width: "64px" }} onClick={this.onSubmit}>
                  Lưu
              </Button>) :
                (<Button  type="primary" htmlType="submit" style={{ marginLeft: 12, width: "64px" }} onClick={this.onSubmit} disabled>
                  Lưu
              </Button>)}
              </Form.Item>
            </Form>)
            :
            (<Form {...layout}>
              <Form.Item label="Thị trường" labelAlign={'left'}>
                <Input defaultValue={`${pair1} / ${pair2}`} disabled />
              </Form.Item>
              <Form.Item label="Phí" labelAlign={'left'}>
                <Input type="text" name='fee' value={coin.fee} onChange={this.onChange} />
              </Form.Item>
              <Form.Item label="Lượng giao dịch tối thiểu" labelAlign={'left'}>
                <Input type="text" name="minimum_quantity" value={coin.minimum_quantity} onChange={this.onChange} />
              </Form.Item>
              <Form.Item label="Tổng giao dịch tối thiểu" labelAlign={'left'}>
                <Input type="text" name="minimum_quantity" value={coin.minimum_amount} onChange={this.onChange} />
              </Form.Item>
  
              <Form.Item label="Phần thập phân" labelAlign={'left'}>
                <Select name="precision" onChange={this.onChangePrecision} value={this.state.precision}>
                  {this.showPrecision()}
                </Select>
              </Form.Item>
              <Form.Item label="Phần thập phân số lượng" labelAlign={'left'}>
                <Select name="minimum_quantity_precision" onChange={this.onChangePrecisionQuantity} value={this.state.precision_quantity}>
                  {this.showPrecision()}
                </Select>
              </Form.Item>
              <Form.Item label="Phần thập phân tổng" labelAlign={'left'}>
                <Select name="minimum_amount_precision" onChange={this.onChangePrecisionAmount} value={this.state.precision_amount}>
                  {this.showPrecision()}
                </Select>
              </Form.Item>
              
              <Form.Item {...tailLayout} style={{ marginBottom: "12px" }} className="text-right">
                <Button
                  type="primary"
                  onClick={this.handleCancel}
                  style={{ width: "64px" }}
                >
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 12, width: "64px" }} onClick={this.onSubmit}>
                  Lưu
                </Button>

              </Form.Item>
            </Form>)
          }
        </Modal>
      </div>
    );
  }
}

export default SettingFeeTransaction;
