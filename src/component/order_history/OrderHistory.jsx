import React, { Component } from "react";
import { Table, Select, Input, DatePicker, Space } from "antd";
import { map } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import { formatCurrency2 } from "../../common/utils";
import "./OrderHistory.css";
import moment from "moment";
import utils from "../../common/utils";
import consts from "../../consts";

const { Option } = Select;
const { COLOR_BUY, COLOR_SELL } = consts;
const LIST_ORDER_STATUS = {
  1: "Đang chờ xử lý",
  2: "Đang xủ lý",
  3: "Thành công",
};

const LIST_PAYMENT = {
  1: "Thanh toán khi nhận hàng (COD)",
  2: "Viettel Pay",
  3: "Momo",
};

class OrderHistory extends Component {
  columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "Ngày đặt",
      dataIndex: "order_date",
      key: "order_date",
      fixed: "left",
      render: (createdAt) =>
        utils.formatTimeFromUnix(createdAt, "DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ngày tạo",
      dataIndex: "date_created",
      key: "date_created",
      fixed: "left",
      render: (createdAt) =>
        createdAt > 0 ? utils.formatTimeFromUnix(createdAt, "DD/MM/YYYY HH:mm") : '',
    },
    {
      title: "Thanh toán",
      dataIndex: "payment_id",
      key: "payment_id",
      render: (payment) => LIST_PAYMENT[payment],
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (total) => formatCurrency2(total),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      orderHistory: [],
      orderPairs: [],
      currentPage: 1,
      totalCount: 0,
      ws: null,
    };

    this.filter = {
      start: 0,
      end: 0,
      status: 1,
      offset: 0,
      limit: consts.DEFAULT_PAGE_SIZE,
    };
  }
  timeout = 250;
  connect = () => {
    var ws = new WebSocket("ws://192.168.1.46:8080/v1/api/wsorders");
    let that = this; // cache the this
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log("connected websocket main component");
      
      this.setState({ ws: ws });
      const message = {
        channel: "WS_EVENT_PUBLIC_ORDER_BOOK",
        message: "OPEN",
      };
      ws.send(JSON.stringify(message));
      that.timeout = 250; // reset timer to 250 on open of websocket connection
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    ws.onmessage = (evt) => {
      // listen to data sent from the websocket server
      // const message = JSON.parse(evt);
      // console.log;
      utils.showNotification(
        <span style={{ color: "green", fontWeight: "bold" }}>Thông báo</span>,
        "Có một đơn đặt hàng mới"
      );
      this.fetchData();

    };
    // websocket onclose event listener
    ws.onclose = (e) => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        e.reason
      );
          
      that.timeout = that.timeout + that.timeout; //increment retry interval
      connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );

      ws.close();
    };
  };

  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };


  componentDidMount() {
    this.fetchData();
    this.connect()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      console.log(nextProps, "orderHistory");
      this.setState({
        orderHistory: nextProps.orderHistory?.orderHistory || [],
        totalCount: nextProps.orderHistory?.totalCount,
      });
    }
  }

  handleChangeOrderStatus = ({ value: status }) => {
    console.log(status, "status");
    this.filter.status = status;
    this.fetchData();
  };

  onChangeDateStart = (value) => {
    const { onFetchFilterOrderHistoryAction } = this.props;

    if (value !== null) {
      let start = value.startOf("day").toString();
      // dateStart = moment(start).valueOf()/1000;
      this.filter.start = parseInt(moment(start).valueOf() / 1000);
    } else {
      this.filter.start = 0;
    }
    onFetchFilterOrderHistoryAction(this.filter);
  };

  onChangeDateEnd = (value) => {
    const { onFetchFilterOrderHistoryAction } = this.props;
    if (value !== null) {
      let dateEnd = value.endOf("day").toString();
      this.filter.end = parseInt(moment(dateEnd).valueOf() / 1000);
    } else {
      this.filter.end = 0;
    }
    onFetchFilterOrderHistoryAction(this.filter);
  };

  fetchData = (
    offset = 0,
    limit = consts.DEFAULT_PAGE_SIZE,
    isRefresh = false
  ) => {
    debugger
    if (isRefresh) {
      this.filter = {
        ...this.filter,
        offset: 0,
        limit: consts.DEFAULT_PAGE_SIZE,
      };
      this.setState({ currentPage: 1 });
    } else {
      this.filter = {
        ...this.filter,
        offset,
        limit,
      };
    }
    this.props.onFetchFilterOrderHistoryAction(this.filter);
  };

  renderListOrderStatus = () =>
    map(LIST_ORDER_STATUS, (value, key) => (
      <Option value={key}>{value}</Option>
    ));

  render() {
    const { orderPairs } = this.state;
    return (
      <div className="OrderTransaction">
        <div className="Transaction">
          <h3>Lịch sử lệnh</h3>
        </div>
        <div className="Transaction-Congcu">
          <div>
            <span className="Transaction-LoaiLenh">Trạng thái</span>
            <Select
              labelInValue
              defaultValue={{ value: "Tất cả" }}
              style={{ width: 140 }}
              onChange={this.handleChangeOrderStatus}
            >
              <Option value="0">Tất cả</Option>
              {this.renderListOrderStatus()}
            </Select>
          </div>
          <div className="DateStart">
            <span className="DateStart-NBD"> Ngày bắt đầu</span>
            <DatePicker
              onChange={this.onChangeDateStart}
              style={{ width: 120 }}
            />
          </div>
          <div className="DateEnd">
            <span className="DateEnd-NKT"> Ngày kết thúc</span>
            <DatePicker
              onChange={this.onChangeDateEnd}
              style={{ width: 120 }}
            />
          </div>
        </div>
        <div className="Table">
          <Table
            columns={this.columns}
            dataSource={this.state.orderHistory || []}
            // scroll={{ x: 1600 }}
            bordered
            pagination={{
              current: this.state.currentPage,
              showSizeChanger: false,
              onChange: (currentPage, pageSize) => {
                this.fetchData((currentPage - 1) * pageSize, pageSize);
                this.setState({ currentPage });
              },
              defaultPageSize: consts.DEFAULT_PAGE_SIZE,
              total: this.state.totalCount || 0,
              hideOnSinglePage: true,
            }}
          />
        </div>
      </div>
    );
  }
}

export default OrderHistory;
