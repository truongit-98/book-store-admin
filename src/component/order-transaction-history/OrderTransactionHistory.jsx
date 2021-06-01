import React, { Component } from 'react';
import { Table, Select, Input, DatePicker, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './OrderTransactionHistory.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/order_transaction_history';
import moment from 'moment';
import utils from '../../common/utils';
import BigNumber from 'bignumber.js';
import consts from '../../consts';

const { Option } = Select;

const { COLOR_BUY, COLOR_SELL } = consts;

class OrderTransactionHistory extends Component {
  columns = [
    {
      title: 'Tài Khoản',
      width: 160,
      dataIndex: 'transaction_type',
      render: (tranType, orderTrans) => <div
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: '160px',
          textOverflow: 'ellipsis',
        }}
        title={utils.isBuyOrder(tranType) ? orderTrans.buyer_pubkey : orderTrans.seller_pubkey}>
        {utils.isBuyOrder(tranType) ? orderTrans.buyer_pubkey : orderTrans.seller_pubkey}
      </div>
    },
    {
      title: 'Thời gian',
      width: 120,
      dataIndex: 'created_at',
      key: 'created_at',
      render: (createdAt) => utils.formatTimeFromUnix(createdAt, 'DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Loại giao dịch',
      width: 100,
      dataIndex: 'transaction_type',
      key: 'transaction_type',
      // render: (transactionType) => utils.parseOrderType(transactionType),
      render: (tranType) => <div style={{
        color: utils.isBuyOrder(tranType) ? COLOR_BUY : COLOR_SELL,
      }}>
        {utils.parseTradeType(tranType)}
      </div>,
    },
    {
      title: 'Cặp',
      width: 120,
      dataIndex: 'pair',
      key: 'pair',
    },
    {
      title: 'Giá',
      width: 120,
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      width: 120,
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Tổng số',
      width: 120,
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      orderTransactions: [],
      orderPairs: [],
      pos: 0,
      currentPage: 1,
      totalCount: 0,
    };
    this.filter = {
      coin: '',
      currency: '',
      trade_type: -1,
      begin: '',
      end: '',
      pos: 0,
      count: consts.DEFAULT_PAGE_SIZE,
    };
  }

  showOptionPairs(orderPairs) {
    let result = null;
    if (orderPairs.length > 0) {
      result = orderPairs.map((item, index) => {
        return (
          <Option
            key={index}
            value={`${item.coin}/${item.currency}`}
          >
            {item.coin}/{item.currency}
          </Option>
        );
      });
    }
    return result;
  }

  onChangePairs = (value) => {
    let pairs = value.value.split('/');
    let coin = pairs[0];
    let currency = pairs[1];
    this.filter.coin = coin;
    this.filter.currency = currency;
    const { onFetchFilterTransactionHistoryAction } = this.props;
    onFetchFilterTransactionHistoryAction(this.filter);
  };

  onTradeType = (value) => {
    let tradeType = value.value;
    this.filter.trade_type = parseInt(tradeType);
    //onFetchOrderTradeTypeAction({trade_type: value.value});
    const { onFetchFilterTransactionHistoryAction } = this.props;
    onFetchFilterTransactionHistoryAction(this.filter);
  };

  onChangeDateStart = (value) => {
    if (value !== null) {
      let start = value.startOf('day')
        .toString();
      // dateStart = moment(start).valueOf()/1000;
      this.filter.begin = parseInt(moment(start)
        .valueOf() / 1000);
    } else {
      this.filter.begin = '';
    }
  };

  onChangeDateEnd = (value) => {
    const { onFetchFilterTransactionHistoryAction } = this.props;
    if (value !== null) {
      let dateEnd = value.endOf('day')
        .toString();
      this.filter.end = parseInt(moment(dateEnd)
        .valueOf() / 1000);
    } else {
      this.filter.end = '';
    }
    onFetchFilterTransactionHistoryAction(this.filter);
  };

  // onChangeSearch = (event) => {
  //   const currentVale = event.target.value;
  //   console.log('current', currentVale);

  //   const filterData = this.props.orderTrans.orderTransactions.filter(entry =>
  //     entry.pair.includes(currentVale)
  //   );
  //   this.setState({data: filterData })
  //   // setDataSource(filterData);

  //   // setTimeout( () => {
  //   //   console.log('current', currentVale);
  //   // },3000);
  //   // clearTimeout();
  // }

  componentDidMount() {
    const { onFetchFilterTransactionHistoryAction } = this.props;
    onFetchFilterTransactionHistoryAction(this.filter);

    const { onFetchParisOrderTransactionHistoryAction } = this.props;
    onFetchParisOrderTransactionHistoryAction();
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    if (nextprops !== this.props) {
      this.setState({
        orderTransactions: nextprops.orderTrans.orderTransactions,
        totalCount: nextprops.orderTrans.totalCount,
        orderPairs: nextprops.orderTrans.orderPairs,
      });
    }
    console.log('totalCount', nextprops.orderTrans.totalCount);
  }

  render() {
    const { orderPairs } = this.state;
    return (
      <div className="OrderTransaction">
        <div className="Transaction">
          <h3>Lịch sử giao dịch lệnh</h3>
        </div>
        <div className="Transaction-Congcu">
          <div className="d-flex fll">
            <div className="mr-medium">
              <span className="Transaction-Bag">Cặp</span>
              <Select
                labelInValue
                defaultValue={{ value: 'Tất cả' }}
                style={{ width: 115 }}
                onChange={this.onChangePairs}
              >
                <Option value=""> Tất cả </Option>
                {this.showOptionPairs(orderPairs)}
              </Select>
            </div>
            <div className="Transaction__TradeStye">
              <span className="Transaction__TradeStye-Select">Loại giao dịch</span>
              <Select
                labelInValue
                defaultValue={{ value: 'Tất cả' }}
                style={{ width: 120 }}
                onChange={this.onTradeType}
              >
                <Option value="-1">Tất cả </Option>
                <Option value="0">Mua </Option>
                <Option value="1">Bán </Option>
              </Select>
            </div>
          </div>
          <div className="d-flex flr">
            <div className="DateStart mr-medium">
              <span className="DateStart-NBD"> Ngày bắt đầu</span>
              <DatePicker onChange={this.onChangeDateStart} style={{ width: 120 }}/>
            </div>
            <div className="DateEnd">
              <span className="DateEnd-NKT"> Ngày kết thúc</span>
              <DatePicker onChange={this.onChangeDateEnd} style={{ width: 120 }}/>
            </div>
          </div>
          {/* <div>
            <Input onChange = {this.onChangeSearch} placeholder="Tìm kiếm" prefix={<SearchOutlined />} style={{ width: 200 }}/>
          </div> */}
        </div>
        <div className="Table">
          <Table
            columns={this.columns}
            dataSource={this.state.orderTransactions || []}
            bordered
            pagination={{
              showSizeChanger: false,
              current: this.state.currentPage,
              onChange: (page, pageSize) => {
                this.props.onFetchFilterTransactionHistoryAction({
                  coin: this.filter.coin,
                  currency: this.filter.currency,
                  trade_type: this.filter.trade_type,
                  begin: this.filter.begin,
                  end: this.filter.end,
                  pos: (page - 1) * pageSize,
                  count: pageSize,
                });
                this.setState({ currentPage: page });
              },
              defaultPageSize: 10,
              total: this.state.totalCount,
              hideOnSinglePage: true,
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderTrans: state.orderTrans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchFilterTransactionHistoryAction: (params) => {
      dispatch(actions.fetchFilterTransactionHistoryAction(params));
    },
    onFetchOrderTradeTypeAction: (params) => {
      dispatch(actions.fetchOrderTradeTypeAction(params));
    },
    onFetchParisOrderTransactionHistoryAction: (params) => {
      dispatch(actions.fetchPairsOrderTransactionHistoryAction(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderTransactionHistory);
