import React, { Component } from 'react';
import {
  Table, Input, Select, DatePicker,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { map } from 'lodash';
import moment from 'moment';
import consts from '../consts';
import utils from '../common/utils';

const { Option } = Select;

const columns = [
  {
    title: 'Tài khoản',
    dataIndex: 'pubkey',
    key: 'pubkey',
    render: (pubkey) => <div
      className='ellipsis'
      title={pubkey}
    >{pubkey}</div>
  },
  {
    title: 'Đồng',
    dataIndex: 'currency',
    key: 'currency',
  },
  {
    title: 'Thời gian',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Địa chỉ gửi',
    dataIndex: 'from_address',
    key: 'from_address',
    render: (fromAddr) => <div
      className='ellipsis'
      title={fromAddr}
    >{fromAddr}</div>
  },
  {
    title: 'Địa chỉ nhận',
    dataIndex: 'to_address',
    key: 'to_address',
    render: (toAddr) => <div
      className='ellipsis'
      title={toAddr}
    >{toAddr}</div>
  },
  {
    title: 'Số tiền giao dịch',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Phí giao dịch',
    dataIndex: 'fee',
    key: 'fee',
    render: (fee) => <div>{fee ?? 'Miễn phí'}</div>
  },
  {
    title: 'Số tiền nhận được',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Loại',
    dataIndex: 'type',
    key: 'type',
    render: (type) => <div style={{ color: type === 0 ? consts.COLOR_BUY : consts.COLOR_SELL}}>
      {utils.parseTransType(type)}
    </div>
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
];

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0,
    };
    this.filter = {
      trans_type: consts.TYPE_ALL,
      currency: '',
      contract: '',
      trans_status: consts.TYPE_ALL,
      pos: 0,
      count: consts.DEFAULT_PAGE_SIZE,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  setTransType = (transType) => {
    this.filter.trans_type = transType;
    this.fetchData();
  };
  setTransStatus = (transStatus) => {
    this.filter.trans_status = transStatus;
    this.fetchData();
  };
  setCurrency = (currency) => {
    console.log(currency, "currency");
    this.filter.currency = currency;
    this.fetchData();
  };
  setStartDate = (start) => {
    if (start !== null) {
      start = start.startOf('day')
        .toString();
      this.filter.begin = parseInt(moment(start)
        .valueOf() / 1000);
    } else {
      delete this.filter.begin;
    }
  };

  setEndDate = (end) => {
    if (end !== null) {
      let end = end.endOf('day')
        .toString();
      this.filter.end = parseInt(moment(end)
        .valueOf() / 1000);
    } else {
      delete this.filter.end;
    }

    this.fetchData();
  };

  fetchData = (pos = 0, count = consts.DEFAULT_PAGE_SIZE) => {
    this.filter = {
      ...this.filter,
      pos,
      count,
    }
    this.props.onFetchTransHistoryAction(this.filter, this.updateTotalCount);
  };

  updateTotalCount = (totalCount) => this.setState({totalCount});
  
  renderSelectCoins = () => {
    console.log(this.props.coins, ": this.props.coins src/component/TransactionHistory.jsx:151");
    return map(this.props.coins || [], ({ symbol }) => <Option value={symbol}>
      {symbol}
    </Option>);
  };

  render() {
    console.log(this.props.trans, 'this.props.trans');

    return (
      <div className="withdrawalHistory">
        <h2> Danh sách nạp rút </h2>
        <div className="transaction">
          <span style={{ marginRight: 8 }}> Giao dịch:  </span>
          <Select defaultValue="-1" style={{
            width: 90,
            marginRight: 14
          }} onChange={this.setTransType}>
            <Option value="-1">Tất cả</Option>
            <Option value="0">Nạp</Option>
            <Option value="1">Rút</Option>
          </Select>

          <span style={{ marginRight: 8 }}> Trạng thái:  </span>
          <Select defaultValue="-1" style={{
            width: 90,
            marginRight: 14
          }} onChange={this.setTransStatus}>
            <Option value="-1">Tất cả</Option>
            <Option value="0">Thành công</Option>
            <Option value="1">Đang chờ xử lý</Option>
            <Option value="2">Đã đệ trình</Option>
            <Option value="3">Lỗi</Option>
            <Option value="4">Huỷ bỏ</Option>
          </Select>

          <span style={{ marginRight: 8 }}> Đồng:  </span>
          <Select defaultValue="All" style={{
            width: 90,
            marginRight: 14
          }} onChange={this.setCurrency}>
            <Option value="">Tất cả</Option>
            {this.renderSelectCoins()}
          </Select>
          <span style={{ marginRight: 8 }}> Ngày Bắt Đầu:  </span>
          <DatePicker style={{
            width: 120,
            marginRight: 14
          }}/>
          <span style={{ marginRight: 8 }}> Ngày Kết Thúc:  </span>
          <DatePicker style={{
            width: 120,
            marginRight: 14
          }}/>
          <Input placeholder="Tìm kiếm ..." prefix={<SearchOutlined/>} style={{
            width: 250,
            float: 'right'
          }}/>
        </div>
        <Table columns={columns} dataSource={this.props.trans || []}
               pagination={{
                defaultPageSize: consts.DEFAULT_PAGE_SIZE,
                showSizeChanger: false,
                total: this.state.totalCount,
                onChange: (page, pageSize) => {
                  this.fetchData((page - 1) * pageSize, pageSize)
                },
                hideOnSinglePage: true,
                responsive: true
               }} bordered/>
      </div>
    );
  }
}

export default TransactionHistory;
