import React, { Component } from 'react';
import { Input, Modal, Descriptions, Row, Col, Button, Badge } from 'antd';
import { isEmpty } from 'lodash';
import utils from '../common/utils';

class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visible: false,
      // isAddNew: false,
      address: '',
      // name: '',
    };
  }

  // columns = [
  //   {
  //     align: "center",
  //     title: "STT",
  //     dataIndex: "stt",
  //     key: "stt",
  //     render: (a1, a2, i) => <div>{i + 1}</div>,
  //   },
  //   {
  //     align: "center",
  //     title: "Pubkey",
  //     dataIndex: "pubkey",
  //     key: "pubkey",
  //   },
  //   {
  //     align: "center",
  //     title: "Tên hiển thị",
  //     dataIndex: "display_name",
  //     key: "display_name",
  //   },
  //   {
  //     align: "center",
  //     title: "Trạng thái",
  //     dataIndex: "status",
  //     key: "status",
  //     render: () => <div>Đang hoạt động</div>
  //   },
  //   {
  //     align: "center",
  //     title: "Hành động",
  //     dataIndex: "action",
  //     key: "action",
  //     render: () => (
  //       <Space size="middle">
  //         <FaPencilAlt className="styled-icon" onClick={this.showModalDetail} />
  //         <FaBan className="styled-icon" onClick={this.showModalBan} />
  //       </Space>
  //     ),
  //   },
  // ];

  // componentDidMount() {
  //   this.props.fetchAllAdmins();
  // }

  // showModalBan = () => {
  //   confirm({
  //       title: 'Bạn có chắc chắn muốn cấm người dùng này không ?',
  //       icon: <ExclamationCircleOutlined />,
  //       // content: 'Some descriptions',
  //       okText: 'Cấm',
  //       okType: 'danger',
  //       cancelText: 'Không',
  //       onOk() {
  //         console.log('OK');
  //       },
  //       onCancel() {
  //         console.log('Cancel');
  //       },
  //     });
  // }
  //
  // showModalDetail = () => {
  //     this.setState({
  //         visible: true,
  //         isAddNew: false
  //     })
  // }
  //
  // showModalAdd = () => {
  //   this.setState({
  //     visible: true,
  //     isAddNew: true
  //   });
  // };
  //
  // handleCancel = () => {
  //   this.setState({
  //     visible: false,
  //   });
  // };
  //
  // onChangeName = ({ target: { value: name } }) => this.setState({ name });
  // onChangePubkey = ({ target: { value: pubkey } }) => this.setState({pubkey});
  // onPutUser = () => {
  //   this.props.onCreateAdmin({ display_name: this.state.name, pubkey: this.state.pubkey });
  // }
  onChange = ({ target: { value: address } }) => this.setState({ address });

  render() {
    const {
      pubkey,
      email,
      avatar,
      phone,
      last_login,
      registration_date,
      rootkey,
      created_at,
    } = this.props.userInfo || {};

    return (
      <div className="admin-management">
        <div className="feature-add">
          {/* <h3>Công cụ quản trị</h3> */}
          {/* <a style={{ display: 'flex' }} onClick={this.showModalAdd}> */}
          {/*  <MdAddCircle size="20" className="styled-icon" /> */}
          {/*  <span style={{ marginLeft: 4 }}> Thêm quản trị viên </span> */}
          {/* </a> */}
        </div>
        <Row>
          <Col>
            <Input placeholder="Nhập địa chỉ của đồng điện tử" style={{ width: 300 }}
                   onChange={this.onChange}/>
          </Col>
          <Col>
            <Button type="primary" style={{ marginLeft: 10 }}
                    onClick={() => this.props.fetchUserByAddress({ address: this.state.address })}>Search</Button>
          </Col>
        </Row>
        {!isEmpty(this.props.userInfo) && (
          <div className="p-medium bg-white mt-medium">
            <Descriptions title={<Badge status="processing" text="User Info" />}>
              <Descriptions.Item><img src={avatar} alt={avatar} style={{
                height: 88,
                width: 88,
                backgroundSize: 'cover'
              }}/></Descriptions.Item>
              <br/>
              <br/>
              <Descriptions.Item label="Pubkey" span={2}>{pubkey}</Descriptions.Item>
              <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
              <Descriptions.Item
                label="Last Login">{utils.formatTimeFromUnix(last_login)}</Descriptions.Item>
              <Descriptions.Item
                label="Registration Date">{utils.formatTimeFromUnix(registration_date)}</Descriptions.Item>
              <Descriptions.Item label="Affiliate ID">{rootkey}</Descriptions.Item>
              <Descriptions.Item label="Email">{email}</Descriptions.Item>
              <Descriptions.Item
                label="Create At">{utils.formatTimeFromUnix(created_at)}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
        {/* <Table dataSource={this.props.listAdmins} columns={this.columns} bordered /> */}
        {/* /!* Modal Add and Detail *!/ */}
        {/* <Modal */}
        {/*  title={ */}
        {/*      isAddNew ? 'Thêm quản trị viên' : 'Sửa thông tin quản trị viên' */}
        {/*  } */}
        {/*  visible={visible} */}
        {/*  footer={null} */}
        {/*  onCancel={this.handleCancel} */}
        {/* > */}
        {/*  <Form {...layout}> */}
        {/*    <Form.Item label="Tên hiển thị"> */}
        {/*      <Input onChange={this.onChangeName} /> */}
        {/*    </Form.Item> */}
        {/*    <Form.Item label="Pubkey"> */}
        {/*      <Input onChange={this.onChangePubkey} /> */}
        {/*    </Form.Item> */}
        {/*    <Form.Item {...tailLayout} style={{ marginBottom: '12px' }}> */}
        {/*      <Button type="primary" onClick={this.handleCancel} style={{ width: '64px' }}> */}
        {/*        Hủy */}
        {/*      </Button> */}
        {/*      <Button type="primary" style={{ marginLeft: 12, width: '64px' }} onClick={this.onPutUser}> */}
        {/*        { isAddNew ? 'Thêm' : 'Lưu'} */}
        {/*      </Button> */}
        {/*    </Form.Item> */}
        {/*  </Form> */}
        {/* </Modal> */}
        {/* Modal Ban */}
      </div>
    );
  }
}

export default Tools;
