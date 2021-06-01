import React, { Component } from "react";
import { Table, Space, Modal, Input, Button, Form, Checkbox } from "antd";
import { FaPencilAlt, FaBan } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import _ from "lodash";
import {
  ConsoleSqlOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
  TagFilled,
} from "@ant-design/icons";


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

const { confirm } = Modal;
class AdminManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isAddNew: false,
      pubkey: "",
      name: "",
      visibleModalRole: false,
      roleOfUser: [],
      visibleModalDetail2: false,
      roleActive: [],
      roleBody: {
        user_id: "",
        roles: [],
      },
      dataSourceRoleDetail: [],
      //roles that you want to post what compatible user
      dataSourceModelDetail2: [
        {
          key: "1",
          typePeople: "Quan tri vien",
          amount: 10,
          action: "default",
        },
        {
          key: "2",
          typePeople: "Quan tri vien",
          amount: 10,
          action: "default",
        },
      ],
    };
  }

   handleRoute = (authorInfo, permission_link, action) => {
    if (_.isEmpty(permission_link)) {
      return true;
    }
    if (!_.isEmpty(authorInfo)) {
      if (authorInfo.id === 1) {
        return true;
      }
      for (const role of authorInfo?.admin_roles) {
        debugger
        if (
          role.permissions
            ?.find((p) => p.path.includes(permission_link))
            ?.actions?.find((ac) => ac.action === action)
        ) {
          return true;
        }
      }
      // _.forEach(authorInfo?.admin_roles, (role) => {
      //   debugger;
       
      // });
      return false;
    }
    return false;
  };
  

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
      align: "center",
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (id) =>{
        const {authorInfo} = this.props
        if (this.handleRoute(authorInfo, "/v1/api/authorization/roles", "GET") && this.handleRoute(authorInfo, "/v1/api/authorization/permissions", "GET")){
         return  (
          <Space size="middle">
            <FaPencilAlt className="styled-icon" onClick={this.showModalDetail} />
            <FileAddOutlined
              className="styled-icon"
              onClick={() => this.showModalRole(id)}
            />
          </Space>
        )
        }
      },
    },

  ];
  columnsDetail = [
    {
      title: "Quyền",
      dataIndex: "permission_name",
      key: "permission_name",
    },
  ];

  componentDidMount() {
    const {
      fetchAllAdmins,
      getRoles,
      getAction,
      getPermission
    } = this.props;
    fetchAllAdmins();
    getRoles();
    getPermission()
    getAction(this.handleColumnModalDetail);
  }

  handleColumnModalDetail = (actions) => {
    _.forEach(actions, (value) => {
      this.columnsDetail.push({
        title: value.action,
        dataIndex: value.id,
        key: value.id,
        render: (action, record) => {
          return (
            <div>
              <Checkbox disabled checked={record["action_id:".concat(_.toString(value.id))] ? true : false}></Checkbox>
            </div>
          );
        },
      });
  })
  }


  showModalBan = () => {
    confirm({
      title: "Bạn có chắc chắn muốn cấm người dùng này không ?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      okText: "Cấm",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  showModalRole = (id) => {
    console.log(id, "id----------")
    this.props.getRoleByPubkey(id, this.handleGetRolesOfUser);
  };

  showModalDetail = () => {
    this.setState({
      visible: true,
      isAddNew: false,
    });
  };

  showModalAdd = () => {
    this.setState({
      visible: true,
      isAddNew: true,
    });
  };

  toggleModalDetail2 = (data) => {
    let tempData = [];
    const { currentPermissions, currentActions } = this.props;
    _.forEach(currentPermissions, (value, index) => {
      const role_perm =  data?.role_perms?.find(e => e.permission_id === value.id)
      if (role_perm){
        let obj = {
          permission_id: value.id,
          permission_name: value.permission,
        };
        _.forEach(currentActions, (val) => {
          const action = role_perm.controls?.find(e => e.author_control_id === val.id)
          if(action){
            obj["action_id:".concat(_.toString(val.id))] = val.id;
          }
        });
        tempData.push({ ...obj, key: index });
      }
    });
    console.log(tempData)
    this.setState({
      visibleModalDetail2: !this.state.visibleModalDetail2,
      dataSourceRoleDetail: tempData,
    });

  };

  showModalDetail2 = (roleId) => {
    this.props.getPermissionControlByRole(roleId, this.toggleModalDetail2);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancelModalRole = () => {
    this.setState({
      roleActive: [],
      visibleModalRole: false,
      roleBody: {
        pubkey: "",
        roles: [],
      },
    });
  };

  handleGetRolesOfUser = (user, roles) => {
    console.log(user, "roleOfUser")
    this.setState({
      roleOfUser: roles,
      visibleModalRole: true,
      user_id: user,
    });
  };

  handleChangeCheckboxParent = (roleId, active) => {
    let tempState = this.state.roleBody;
    if (active) {
      if (this.state.roleOfUser?.find((e) => e.role_id === roleId)) {
        tempState.roles = tempState.roles.filter((e) => e.role_id !== roleId);
      } else {
        tempState.roles.push({ role_id: roleId, active });
      }
    } else {
      if (this.state.roleOfUser?.find((e) => e.role_id === roleId)) {
        tempState.roles.push({ role_id: roleId, active });
      } else {
        tempState.roles = tempState.roles.filter((e) => e.role_id !== roleId);
      }
    }
    this.setState(
      {
        roleBody: tempState,
      },
      () => console.log(tempState, "tempSate ----")
    );
  };

  handleSubmitModal = (event) => {
    event.preventDefault();
    if (this.state.user_id !== "" && this.state.roleBody.roles.length > 0) {
      debugger
      let body = this.state.roleBody;
      body.user_id = this.state.user_id;
      this.props.postRoleForUser(body, this.handleCancelModalRole);
    }
  };

  onchangeInput = (event) => {
    const target = event.target
    if (target){
      this.setState({
        [target.name]: target.value,
      })
    }
  }
  onChangePubkey = ({ target: { value: pubkey } }) => this.setState({ pubkey });
  onPutUser = () => {
    this.props.onCreateAdmin({
      full_name: this.state.full_name,
      email: this.state.email,
      phone: this.state.phone
    }, ()=>{
      this.setState({
        visible: false,
      })
    });
  };
  render() {
    const {
      isAddNew,
      visible,
      visibleModalRole,
      visibleModalDetail2,
    } = this.state;
    const {authorInfo} = this.props
    return (
      <div className="admin-management">
        <div className="feature-add">
          <h3> Danh sách quản trị viên </h3>
          {this.handleRoute(authorInfo, "/v1/api/account/admins", "POST") ? <a onClick={this.showModalAdd}>
            <MdAddCircle size="20" className="styled-icon" />
            <span> Thêm quản trị viên </span>
          </a> : ''}
        </div>
        <Table
          dataSource={this.props.listAdmins || []}
          columns={this.columns}
          bordered
        />
        {/* Modal Add and Detail */}
        <Modal
          className="modal-add-admin"
          title={
            isAddNew ? "Thêm quản trị viên" : "Sửa thông tin quản trị viên"
          }
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Form {...layout}>
            <Form.Item label="Họ tên">
              <Input name="full_name" value={this.state.full_name} onChange={this.onchangeInput} />
            </Form.Item>
            <Form.Item label="Email">
              <Input name="email" value={this.state.email} onChange={this.onchangeInput} />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input name="phone" value={this.state.phone} onChange={this.onchangeInput} />
            </Form.Item>
            <Form.Item {...tailLayout} className="btn">
              <Button
                className="btn-elm"
                type="primary"
                onClick={this.handleCancel}
              >
                Hủy
              </Button>
              <Button
                className="btn-elm-2"
                type="primary"
                onClick={this.onPutUser}
              >
                {isAddNew ? "Thêm" : "Lưu"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal to repair roles   */}
        <Modal
          className="modal-repair-admin"
          title={"Chi tiết vai trò"}
          visible={visibleModalRole}
          okText="Lưu"
          cancelText="Hủy"
          onOk={this.handleSubmitModal}
          onCancel={this.handleCancelModalRole}
        >
          {this.props.roles.map((role, index) => {
            return (
              <MyCheckbox
                key={index}
                role={role}
                visibleModalRole={this.state.visibleModalRole}
                roleOfUser={this.state.roleOfUser}
                showModalDetail={this.showModalDetail2}
                handleChangeCheckboxParent={this.handleChangeCheckboxParent}
              ></MyCheckbox>

            );
          })}
        </Modal>
        {/* Modal detail */}
        <Modal
          className="modal-detail-admin"
          visible={visibleModalDetail2}
          footer={null}
          onCancel={this.toggleModalDetail2}  
        >
         <div className="permissionTable">
            <div>Quyền được sử dụng</div>
            <Table
              dataSource={this.state.dataSourceRoleDetail || []}
              columns={this.columnsDetail}
              bordered
            />
          </div> 
        </Modal>
      </div>
    );
  }
}

export default AdminManagement;

// component role checkbox
class MyCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }
  handleChangeCheckbox = (event) => {
    event.preventDefault();
    const { handleChangeCheckboxParent, role } = this.props;
    const checked = event.target.checked;
    this.setState(
      {
        isChecked: checked,
      },
      () => {
        handleChangeCheckboxParent(role.id, checked);
      }
    );
  };

  componentWillReceiveProps(nextProps) {
    // handle new visibleDetail
    if (nextProps.visibleModalRole !== this.props.visibleModalRole) {
      console.log("true,")
      if (
        nextProps.visibleModalRole &&
        nextProps.roleOfUser.find(
          (e) => e.role_id === nextProps.role.id 
        )
      ) {
        this.setState({
          isChecked: true,
        });
      } else {
        this.setState({
          isChecked: false,
        });
      }
    }
  }
  componentDidMount() {
    const { role, roleOfUser } = this.props;
    if (roleOfUser.find((e) => e.role_id === role.id )) {
      this.setState({
        isChecked: true,
      });
    } else {
      this.setState({
        isChecked: false,
      });
    }
  }
  showModalDetail = () => {
    const { showModalDetail, role } = this.props;
    showModalDetail(role.id);
  };

  render() {
    const { role, roleOfUser } = this.props;
    return (
      <div className="checkbox-btn" >
        <Checkbox
          className="chk-box"
          checked={this.state.isChecked}
          onChange={this.handleChangeCheckbox}
        >
          {role.role}
        </Checkbox>
        <div></div>
        <Button
          className="btn"
          onClick={this.showModalDetail}
          type="primary"
        >
          Chi tiết
        </Button>
      </div>
    );
  }
}

