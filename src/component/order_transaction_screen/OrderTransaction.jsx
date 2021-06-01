import React, { Component } from "react";
import {  Table, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './OrderTransaction.css';
const { Option } = Select;

class OrderTransaction extends Component {
  columns = [
    {
      title: "Tài Khoản",
      width: 120,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Thời gian",
      width: 100,
      dataIndex: "date",
      key: "date",
      fixed: "left",
    },
    {
        title: "Loại lệnh",
        width: 100,
        dataIndex: "loailenh",
        key: "loailenh",
        fixed: "left",
    },
    { title: "Loại giao dịch", dataIndex: "address", key: "1" },
    { title: "Cặp", dataIndex: "address", key: "2" },
    { title: "Số lượng", dataIndex: "address", key: "3" },
    { title: "Tổng số", dataIndex: "address", key: "4" },
    { title: "Đã khớp", dataIndex: "address", key: "5" },
    { title: "Còn lại", dataIndex: "address", key: "6" },
    {
      title: "Trạng thái",
      width: 100,
      dataIndex: "address",
      key: "address",
      fixed: "right",
    },
  ];

  data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
  ];

  handleChange = (value) => {
    console.log(value);
  }

  render() {
    return (
      <div className = "OrderTransaction ">
        <div className = "Transaction">
          <h4>Danh sách giao dịch</h4>
        </div>
        <div className = "Transaction-Congcu">
          <div>
            <span className = "Transaction-LoaiLenh">Loại lệnh</span>
            <Select
              labelInValue
              defaultValue={{ value: 'Tất cả' }}
              style={{ width: 90 }}
              onChange={this.handleChange}
            >
              <Option value="jack">Tất cả </Option>
              <Option value="lucy">Mua </Option>
              <Option value="lucy">Bán </Option>
            </Select>
          </div>
          <div>
            <span className = "Transaction-LoaiLenh">Loại giao dịch</span>
            <Select
              labelInValue
              defaultValue={{ value: 'Tất cả' }}
              style={{ width: 90 }}
              onChange={this.handleChange}
            >
              <Option value="jack">Tất cả </Option>
              <Option value="lucy">Market </Option>
              <Option value="lucy">Limit </Option>
              <Option value="lucy">Stop-Limit </Option>
            </Select>
          </div>
          <div>
            <Input  placeholder="Tìm kiếm" prefix={<SearchOutlined />} style={{ width: 260 }}/>
          </div>
        </div>
        <div>
            <Table columns = {this.columns} dataSource = {this.data} scroll = {{ x : 1200 }} bordered />
        </div>
      </div>
    );
  }
}

export default OrderTransaction;
