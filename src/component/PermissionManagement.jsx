// eslint-disable-next-line
import React, { Component } from "react";
import { Button, Input, Modal, Table } from "antd";
import { MdAddCircle } from "react-icons/md";
import {SearchOutlined} from "@ant-design/icons"
import _ from "lodash";
class PermissionManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleAddPermission: false,
      visibleDetailPermission: false,
      permission: "",
      path: "",
      id_permission: "",
      currentPage: 1,
      searchPermissions: [],
      searchKey: ""
      //get initial first permission page
    };
  }

  columns = [
    {
      title: "Danh mục các quyền",
      dataIndex: "permission",
      key: "permission",
      width: 200,
      render: (permission) => (
        <div style={{ fontWeight: 500, lineHeight: "32px" }}>{permission}</div>
      ),
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
      width: 200,
      render: (path) => (
        <div style={{ fontWeight: 500, lineHeight: "32px" }}>{path}</div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      width: 120,
      render: (action, record) => (
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => this.showModalDetailPermission(record)}
            type="primary"
            style={{ flex: 1, marginRight: 15 }}
          >
            Chi tiết
          </Button>
          <div style={{ flex: 0.6 }}></div>
          <Button
            type="ghost"
            style={{ flex: 1 }}
            onClick={() => this.handleDeletePemrission(record)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  setDataSourceForTable = (data) => {
    this.setState({
      searchPermissions: data
    })
  }

  componentDidMount() {
    this.props.getPermission(this.setDataSourceForTable);
  }
  componentDidUpdate(prevProps) {
    // if(this.props.currentPermissions!=prevProps.currentPermissions){
    //   this.props.getPermission(0,100)
    // }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentPermissions !== this.props.currentPermissions) {
      this.setDataSourceForTable(nextProps.currentPermissions)
    }
  }

  debounce = _.debounce(() => {
    let fakeSearchPermission = this.props.currentPermissions.filter(
      (permission) => permission.permission.includes(this.state.searchKey)
    );
    this.setState({
      searchPermissions: fakeSearchPermission.length > 0 ? fakeSearchPermission : this.props.currentPermissions,
    });
  }, 700);

  searchPermission = (event) => {
    console.log("serching");
    const target = event.target
    this.setState({
      [target.name]: target.value
    })
    this.debounce()
  };

  showModalAddPermission = () => {
    this.setState({
      visibleAddPermission: !this.state.visibleAddPermission,
      inputValue: "",
    });
  };

  showModalDetailPermission = (record) => {
    this.setState({
      visibleDetailPermission: true,
      permission: record.permission,
      path: record.path,
      id_permission: record.id,
    });
  };

  handleCancelModalAddPermission = () => {
    this.setState({
      visibleAddPermission: false,
      permission: "",
      path: "",
    });
  };

  handleCancelModalDetailPermission = () => {
    this.setState({
      visibleDetailPermission: false,
      permission: "",
      path: "",
    });
  };

  handleOKAddPermission = async () => {
    console.log("add, permsision", this.state)
    await this.props.addPermission({
      name: this.state.permission,
      path: this.state.path,
    });
    this.setState({
      visibleAddPermission: false,
      permission: "",
      path: "",
    });
  };

  handleOKDetailPermission = async () => {
    await this.props.putPermission(
      this.state.permission,
      this.state.path,
      this.state.id_permission
    );
    this.props.getPermission(0, 100);
    this.setState({
      visibleDetailPermission: false,
    });
  };

  handleDeletePemrission = async (record) => {
    this.props.deletePermission(record.id);
  };

  render() {
    const {
      visibleAddPermission,
      visibleDetailPermission,
      permission,
      path,
    } = this.state;

    return (
      <div className="permission-management">
        <div className="header-per">
          {/* <div className="search-text">Tìm kiếm: </div> */}
          <SearchOutlined style={{fontSize: "30px"}}/>
          <Input name="searchKey" value={this.state.searchKey} onChange={this.searchPermission} />
          <div className="space1" />
          <Button onClick={this.showModalAddPermission}>
            <MdAddCircle size="20" className="styled-icon" />
            <span> Thêm quyền </span>
          </Button>
        </div>

        <div className="table-per">
          <Table
            style={{ marginLeft: "30px", marginRight: "30px" }}
            dataSource={this.state.searchPermissions}
            columns={this.columns}
            pagination={{
              current: this.state.currentPage,
              onChange: async (page, pageSize) => {
                this.setState({
                  currentPage: page,
                });
              },
              defaultPageSize: 10,
              hideOnSinglePage: true,
            }}
            bordered
          />
        </div>
        {/* add permission */}
        <Modal
          title="Thêm quyền"
          className="modal-add-permission"
          visible={visibleAddPermission}
          onOk={this.handleOKAddPermission}
          okText="Thêm"
          cancelText="Hủy"
          onCancel={this.handleCancelModalAddPermission}
        >
          <div>
            <div className="permission">
              <div>Quyền: </div>
              <Input
                value={this.state.permission}
                onChange={(value) => {
                  this.setState({
                    permission: value.target.value,
                  });
                }}
              />
              <div />
            </div>
            <div className="path">
              <div>Path: </div>
              <Input
                value={this.state.path}
                onChange={(value) => {
                  this.setState({
                    path: value.target.value,
                  });
                }}
              />
              <div />
            </div>
          </div>
        </Modal>

        {/* Modal detail */}
        <Modal
          className="modal-detail-permission"
          title="Chi tiết"
          className="modal-detail-permission"
          visible={visibleDetailPermission}
          okText="Lưu"
          onOk={this.handleOKDetailPermission}
          cancelText="Hủy"
          onCancel={this.handleCancelModalDetailPermission}
        >
          <div>
            <div className="permission-line">
              <div>Quyền: </div>
              <div className="per">{permission}</div>
              <div />
            </div>
            <div className="path-line">
              <div>Path: </div>
              <Input
                value={path}
                onChange={(value) => {
                  this.setState({
                    path: value.target.value,
                  });
                }}
              />
              <div />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PermissionManagement;
