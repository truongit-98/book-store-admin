import React, { Component } from 'react';
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import consts from '../consts';

class LoginHistory extends Component {
  columns = [
    {
      title: 'Pubkey',
      dataIndex: 'pubkey',
      key: 'pubkey',
      width: 200,
    },
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
      width: 500,
      render: (agent) => <div style={{
        overflow: 'hidden',
        width: 500,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }} title={agent}>{agent}</div>
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      width: 50,
    },
    {
      title: 'Thời gian đăng nhập',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
    },
  ];

  data = [
    {
      uid: '1',
      gmail: 'kimanh123@gmail.com',
      time: '24/08/2020, 5:20 AM',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      currentPage: 1,
      totalCount: 0,
    };
  }

  componentDidMount() {
    this.props.loginHistoryAction({
      pos: 0,
      count: consts.DEFAULT_PAGE_SIZE,
    }, (totalCount) => {
      console.log(totalCount, 'totalCount');
      this.setState({
        totalCount,
        isLoading: false
      });
    });
  }

  render() {
    return (
      <div className="list-user">
        <div className="input-search">
          <Input
            placeholder="Tìm kiếm ..."
            prefix={<SearchOutlined/>}
            style={{
              width: 250,
              float: 'right',
              marginRight: 26
            }}
          />
        </div>
        <Table dataSource={this.props.loginHistories || []} columns={this.columns} pagination={{
          current: this.state.currentPage,
          onChange: (page, pageSize) => {
            this.props.loginHistoryAction({
              pos: (page - 1) * pageSize,
              count: pageSize,
            }, (totalCount) => this.setState({
              totalCount,
              currentPage: page,
              isLoading: false
            }));
          },
          defaultPageSize: 10,
          total: this.state.totalCount,
          hideOnSinglePage: true,
        }} bordered/>
      </div>
    );
  }
}

export default LoginHistory;
