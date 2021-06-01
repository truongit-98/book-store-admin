import React, { Component } from "react";
import { Table, Upload, Input, Button, Modal, Form, Select } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  CodeSandboxCircleFilled,
} from "@ant-design/icons";
import _ from "lodash";
import Switch from "react-switch";
import consts from "../consts";
import utils, { handleVietNamemese, formatCurrency2 } from "../common/utils";
const LIST_ACTIVE = {
  false: "Không kích hoạt",
  true: "Kích hoạt",
};


const LIST_PAYMENT = {
  1: "Thanh toán khi nhận hàng (COD)",
  2: "Viettel Pay",
  3: "Momo",
};

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

class ListUser extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      toggledAccount: false,
      toggledGmail: true,
      totalCount: 0,
      currentPage: 1,
      isLoading: false,
      visible: false,
      previewImage: "",
      previewTitle: "",
      previewVisible: false,
      searching: false,
      fileList: [],
      info: {},
      orderVisible: false,
    };
  }

  columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Họ tên",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Trạng thái",
      dataIndex: "activate",
      key: "activate",
      render: (isBanned) => (
        <div className="block">
          <span>{LIST_ACTIVE[isBanned]}</span>
          {/* <span> {intl.formatMessage({ id: 'collapsed' })}</span> */}
        </div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button type="primary" onClick={() => this.showDetail(id)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  orderColumns = [
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
        utils.formatTimeFromUnix(createdAt, "DD/MM/YYYY HH:mm"),
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

  componentDidMount() {
    this.props.userListAction(
      {
        pos: 0,
        count: consts.DEFAULT_PAGE_SIZE,
      },
      (data, totalCount) => {
        this.setState({ searchUsers: data, totalCount });
      }
    );
  }

  handleToggledAccountChange = (toggledAccount) => {
    this.setState({
      toggledAccount,
    });
  };

  debounce = _.debounce(() => {
    const { q } = this.state;
    if (!_.isEmpty(q)) {
      this.setState({
        isLoading: true,
      })
      this.props.searchUsers({q}, ()=>{
        this.setState({
          searching: true,
          isLoading: false
        })
      })
    } else {
      this.props.userListAction(
        {
          pos: 0,
          count: consts.DEFAULT_PAGE_SIZE,
        },
        () => {
          this.setState({searching: false, isLoading: false });
        }
      );
    }
  }, 500);

  handleSearch = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
    this.debounce();
  };

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleCancelPreview = () => {
    this.setState({
      previewVisible: false,
    });
  };
  handleChange = ({ fileList }) => this.setState({ fileList });

  showDetail = (id) => {
    if (id){
      this.props.userInfo({id}, ()=>{
        this.setState({ visible: true });
      })
    }
  
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  toggleOrderModal = ()=>{
    this.setState({
      orderVisible: !this.state.orderVisible
    })
  }

  

  render() {
    const coin = {};
    const {info} = this.props;
    const { previewImage, previewVisible, previewTitle, orderVisible                } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined disabled />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div className="list-user">
        <div className="input-search">
          <Input
            placeholder="Tìm kiếm ..."
            name="q"
            onChange={this.handleSearch}
            prefix={<SearchOutlined />}
            style={{ width: 250, float: "right", marginRight: 26 }}
          />
        </div>
        <Table
          loading={this.state.isLoading}
          dataSource={this.props.users || []}
          columns={this.columns}
          pagination={!this.state.searching ? {
            current: this.state.currentPage,
            onChange: (page, pageSize) => {
              this.props.userListAction(
                {
                  pos: (page - 1) * pageSize,
                  count: pageSize,
                },
                (data, totalCount) =>
                  this.setState({
                    totalCount,
                    currentPage: page,
                    isLoading: false,
                  })
              );
            },
            defaultPageSize: 10,
            total: this.state.totalCount,
            hideOnSinglePage: true,
          }: null}
          bordered
        />

        {info? <Modal
          title="Chi tiết khách hàng"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
          width={650}
        >
          <Form {...layout}>
            <Form.Item label="Họ tên">
              <Input disabled value={info.full_name} />
            </Form.Item>
            <Form.Item label="Email">
              <Input disabled value={info.email} />
            </Form.Item>
            <Form.Item label="SĐT">
              <Input
                type="text"
                disabled
                name="minimum_quantity"
                value={info.phone}
              />
            </Form.Item>
            <Form.Item label="Địa chỉ">
              <Input
                type="text"
                disabled
                name="minimum_amount"
                value={info.address}
              />
            </Form.Item>
            <Form.Item label="Avartar">
              <Upload
                disabled
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={[].push()}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {this.state.fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item {...tailLayout} style={{ marginBottom: "12px" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginLeft: 12,
                }}
                onClick={this.toggleOrderModal}
              >
                Thông tin đơn hàng
              </Button>
            </Form.Item>
          </Form>
          <Modal 
           visible={orderVisible}
           footer={null}
           onCancel={this.toggleOrderModal}>
          <Table
          dataSource={info.orders || []}
          columns={this.orderColumns}
          bordered
        />
          </Modal>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancelPreview}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Modal>: ''}
      </div>
    );
  }
}

export default ListUser;
