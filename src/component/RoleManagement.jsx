import React, { Component } from "react";
import {
  Table,
  Space,
  Modal,
  Input,
  Button,
  Checkbox,
  Row,
} from "antd";
import { MdAddCircle } from "react-icons/md";
import _ from "lodash";

const MODAL_ADD_ROLE = "MODAL_ADD_ROLE";
const MODAL_AUTHORIZATION = "MODAL_AUTHORIZATION";
class RoleManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleAdd: false,
      visibleDetail: false,
      inputValue: "",
      dataSource1: [],
      dataSource2: [],
      roleNameReq: "",
      roleDetail: {},
      permissionsBody: {
        role_id: "",
        permissions: [],
      },
      selectAll: {
        name: "selectAll",
        value: false,
      },
      deselectAll: {
        name: "deselectAll",
        value: false,
      },
      isCheckedAll: false,
      isUnCheckedAll: false,
    };
  }

  limit = 10;

  columns = [
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Số lượng ",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (action, record) => (
        <div style={{ display: "flex" }}>
          <Button
            onClick={(event) =>
              this.showModal(event, MODAL_AUTHORIZATION, record)
            }
            type="primary"
            style={{ flex: 1, width: "10px" }}
          >
            Chi tiết
          </Button>
          <div style={{ flex: 0.6 }}></div>
          <Button
            type="ghost"
            style={{ flex: 1 }}
            onClick={() => this.handleDeleteRole(record)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  columnsDetail = [
    {
      title: "Quyền",
      dataIndex: "permission_name",
      key: "permission_id",
    },
  ];

  handleColumnModalDetail = (actions) => {
    _.forEach(actions, (value) => {
      this.columnsDetail.push({
        title: value.action,
        dataIndex: "action_id:".concat(_.toString(value.id)),
        key: "action_id:".concat(_.toString(value.id)),
        render: (action, record) => {
          return (
            <div>
              <MyCheckbox
                permission_id={record.permission_id}
                action_id={value.id}
                handleChangeCheckboxParent={this.handleChangeCheckboxParent}
                isSelectAll={this.state.selectAll.value}
                isDeselectAll={this.state.deselectAll.value}
                visibleDetail={this.state.visibleDetail}
                visibleAdd={this.state.visibleAdd}
                isCheckedAll={this.state.isCheckedAll}
                isUnCheckedAll={this.state.isUnCheckedAll}
                listChecked={this.state.permissionsBody.permissions}
                permsControl={record.permsControl}
              ></MyCheckbox>
            </div>
          );
        },
      });
    });
  };

  //column of add modal

  componentDidMount() {
    const { getRoles, getPermission, getAction } = this.props;
    getRoles();
    getPermission(0, 100);
    getAction(this.handleColumnModalDetail);
  }

  handleDataSource(permsControl) {
    const { currentPermissions, currentActions } = this.props;
    let data = [];
    _.forEach(currentPermissions, (value, index) => {
      let obj = {
        permission_id: value.id,
        permission_name: value.permission,
      };
      _.forEach(currentActions, (val) => {
        obj["action_id:".concat(_.toString(val.id))] = val.id;
      });
      obj["permsControl"] = permsControl.find(e => e.permission_id === value.id);
      data.push({ ...obj, key: index });
    });
    console.log(data,"dataSoure------")
    return data;
  }

  setPermissionControlByRole = (data) => {
    const dataSource = this.handleDataSource(data?.role_perms || []);
    console.log(data.name)
    this.setState({
      roleDetail: data,
      visibleDetail: true,
      permissionsBody: {
        role_id: data.id,
        permissions: [],
      },
      dataSource1: dataSource,
    });
  };

  handleDeleteRole = (record) => {
    this.props.deleteRole(record.id);
  };

  handlePaginationDetail = (value) => {
    const minPage = (value - 1) * this.limit;
    const maxPage = value * this.limit;
    this.setState({
      minValuePagination: minPage,
      maxValuePagination: maxPage,
    });
  };

  showModal = (event, typeModal, record) => {
    event.preventDefault();
    switch (typeModal) {
      case MODAL_AUTHORIZATION:
        this.props.getPermissionControlByRole(
          record.id,
          this.setPermissionControlByRole
        );
        break;
      case MODAL_ADD_ROLE:
        const _arrEmpty = [];
        const dataSource = this.handleDataSource(_arrEmpty);
        this.setState({
          visibleAdd: true,
          dataSource2: dataSource,
        });
        break;
      default:
        return;
    }
  };

  handleCancelModal = () => {
    this.setState({
      isCheckedAll: false,
      isUnCheckedAll: false,
      visibleDetail: false,
      visibleAdd: false,
      roleNameReq: "",
      permissionsBody: {
        role_id: "",
        permissions: [],
      },
      roleDetail: [],
    });
  };

  handleSelectAll = (event) => {
    event.preventDefault();
    const target = event.target;
    if (target) {
      switch (target.value) {
        case this.state.selectAll.name:
          this.setState(
            {
              selectAll: {
                name: this.state.selectAll.name,
                value: target.checked,
              },
              deselectAll: {
                name: this.state.deselectAll.name,
                value: false,
              },
              isCheckedAll: target.checked,
              isUnCheckedAll: false,
            },
            () => {
              _.forEach(this.props.currentPermissions, (perm) => {
                _.forEach(this.props.currentActions, (action) => {
                  this.handleChangeCheckboxParent(
                    perm.id,
                    action.id,
                    this.state.selectAll.value && this.state.isCheckedAll
                  );
                });
              });
            }
          );
          break;
        case this.state.deselectAll.name:
          this.setState(
            {
              selectAll: {
                name: this.state.selectAll.name,
                value: false,
              },
              deselectAll: {
                name: this.state.deselectAll.name,
                value: target.checked,
              },
              isCheckedAll: false,
              isUnCheckedAll: target.checked,
            },
            () => {
              _.forEach(this.props.currentPermissions, (perm) => {
                _.forEach(this.props.currentActions, (action) => {
                  this.handleChangeCheckboxParent(
                    perm.id,
                    action.id,
                    !(this.state.deselectAll.value && this.state.isUnCheckedAll)
                  );
                });
              });
            }
          );
          break;
        default:
          return;
      }
    }
  };

  handleChangeCheckboxParent = (
    permsId,
    actionId,
    active,
    isResetSelectAll
  ) => {
    let tempState = this.state.permissionsBody;
    if (active) {
      if (
        this.state.roleDetail.role_perms
          ?.find((e) => e.permission_id === permsId)
          ?.controls.find((c) => c.author_control_id === actionId)
      ) {
        tempState.permissions = tempState.permissions.filter((e) => {
          if (e.permission_id === permsId) {
            e.controls = e.controls.filter((c) => c.control_id !== actionId);
          }
          return e.controls.length > 0;
        });
      } else {
        let isExist = false;
        tempState.permissions = tempState.permissions.map((e) => {
          if (e.permission_id === permsId) {
            if (!e.controls.find((e) => e.control_id === actionId)) {
              e.controls.push({ control_id: actionId, active: true });
              isExist = true;
            }
          }
          return e;
        });
        if (!isExist) {
          tempState.permissions.push({
            permission_id: permsId,
            controls: [{ control_id: actionId, active: true }],
          });
        }
      }
    } else {
      if (
        this.state.roleDetail.role_perms
          ?.find((e) => e.permission_id === permsId)
          ?.controls.find((c) => c.author_control_id === actionId)
      ) {
        let isExist = false;
        tempState.permissions = tempState.permissions.map((e) => {
          if (e.permission_id === permsId) {
            if (!e.controls.find((e) => e.control_id === actionId)) {
              e.controls.push({ control_id: actionId, active: false });
              isExist = true;
            }
          }
          return e;
        });
        if (!isExist) {
          tempState.permissions.push({
            permission_id: permsId,
            controls: [{ control_id: actionId, active: false }],
          });
        }
      } else {
        tempState.permissions = tempState.permissions.filter((e) => {
          if (e.permission_id === permsId) {
            e.controls = e.controls.filter((c) => c.control_id !== actionId);
          }
          return e.controls.length > 0;
        });
      }
    }
    if (
      isResetSelectAll &&
      (this.state.isCheckedAll || this.state.isUnCheckedAll)
    ) {
      this.setState({
        permissionsBody: tempState,
        isCheckedAll: false,
        isUnCheckedAll: false,
      });
    } else {
      this.setState({
        permissionsBody: tempState,
      });
    }
  };

  handleChangeInput = (event) => {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    if (target) {
      this.setState({
        [name]: target.value,
      });
    }
  };

  getPermissionControlByRole = () => {
    this.props.getPermissionControlByRole(
      this.state.permissionsBody.role_id,
      this.setPermissionControlByRole
    );
  };

  handleSubmitModal = (event, typeModal) => {
   // console.
    event.preventDefault();
    console.log(this.state.permissionsBody.permissions, "body------------fh")
    switch (typeModal) {
      case MODAL_AUTHORIZATION:
        if (this.state.permissionsBody.permissions.length > 0) {
          this.props.postPermissionsControlsForRole(
            this.state.permissionsBody,
            this.handleCancelModal
          );
        } else {
          this.handleCancelModal();
        }
        break;
      case MODAL_ADD_ROLE:
        this.props.addNewRole(
          {
            roleNameReq: this.state.roleNameReq,
            permissionsBody: this.state.permissionsBody,
          },
          this.props.postPermissionsControlsForRole,
          this.handleCancelModal
        );
        console.log("his.state.permissionsBody", this.state.permissionsBody)

        break;
      default:
        this.handleCancelModal();
        return;
    }
  };
  handleDeleteRole = (record) => {
    this.props.deleteRole(record.id);
  };

  render() {
    const { visibleAdd, visibleDetail } = this.state;
    return (
      <div className="role-management">
        {/* Button Add */}
        <div className="add-btn">
          <div className="space1" />
          <Button onClick={(event) => this.showModal(event, MODAL_ADD_ROLE)}>
            <MdAddCircle size="20" className="styled-icon" />
            <span> Thêm vai trò </span>
          </Button>
        </div>

        {/* Table */}
        <div>
          <Table
            dataSource={this.props.roles || []}
            columns={this.columns}
            bordered
          />
        </div>

        {/* Modal Add*/}
        <Modal
          className="modal-add-role"
          title={"Thêm vai trò"}
          visible={visibleAdd}
          okText={"Thêm"}
          onOk={(event) => {
            this.handleSubmitModal(event, MODAL_ADD_ROLE);
          }}
          cancelText="Hủy"
          onCancel={this.handleCancelModal}
          width="750px"
        >
          <div>
            <div className="input-people-type">
              <div className="space1">Vai trò:</div>
              <Input
                value={this.state.roleNameReq}
                name="roleNameReq"
                onChange={this.handleChangeInput}
              />
              <div className="space2" />
              <Row>
                <Checkbox
                  checked={this.state.isCheckedAll}
                  onChange={this.handleSelectAll}
                  value={this.state.selectAll.name}
                >
                  Chọn tất cả
                </Checkbox>
                <Checkbox
                  checked={this.state.isUnCheckedAll}
                  onChange={this.handleSelectAll}
                  value={this.state.deselectAll.name}
                >
                  Bỏ chọn tất cả
                </Checkbox>
              </Row>
            </div>
            <div className="permissionTable">
              <div>Quyền được sử dụng</div>
              <Table
                dataSource={this.state.dataSource2 || []}
                columns={this.columnsDetail}
                bordered
              />
            </div>
          </div>
        </Modal>
        {/* Modal Detail */}
        <Modal
          className="modal-detail-role"
          title={"Chi tiết"}
          visible={visibleDetail}
          okText={"Lưu"}
          onOk={(event) => {
            this.handleSubmitModal(event, MODAL_AUTHORIZATION);
          }}
          cancelText="Hủy"
          onCancel={this.handleCancelModal}
          width="750px"
        >
          <div>
            <div className="input-people-type">
              <div className="space1">Vai trò:</div>
              <Input disabled value={this.state.roleDetail.name} />
              <div className="space2" />
              <Row>
                <Checkbox
                  checked={this.state.isCheckedAll}
                  onChange={this.handleSelectAll}
                  value={this.state.selectAll.name}
                >
                  Chọn tất cả
                </Checkbox>
                <Checkbox
                  checked={this.state.isUnCheckedAll}
                  onChange={this.handleSelectAll}
                  value={this.state.deselectAll.name}
                >
                  Bỏ chọn tất cả
                </Checkbox>
              </Row>
            </div>
            <div className="permissionTable">
              <div>Quyền được sử dụng</div>
              <Table
                dataSource={this.state.dataSource1 || []}
                columns={this.columnsDetail}
                bordered
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default RoleManagement;

class MyCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { handleChangeCheckboxParent } = this.props;
    // handle new visibleDetail
    if (nextProps.visibleDetail !== this.props.visibleDetail) {
      if (
        nextProps.visibleDetail &&
        nextProps.permsControl
          ?.controls.find((e) => e.author_control_id === nextProps.action_id)
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
    // handle new visibleDetail
    if (nextProps.visibleAdd !== this.props.visibleAdd) {
      this.setState({
        isChecked: false,
      });
    }

    // handle new isDeselectAll
    if (nextProps.isDeselectAll !== this.props.isDeselectAll) {
      if (nextProps.isDeselectAll) {
        this.setState(
          {
            isChecked: false,
          },
          () => {
            handleChangeCheckboxParent(
              nextProps.permission_id,
              nextProps.action_id,
              false
            );
          }
        );
      } else {
        if (
          nextProps.permsControl
            ?.controls.find((e) => e.author_control_id === nextProps.action_id)
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
    } else if (
      nextProps.isDeselectAll &&
      nextProps.isUnCheckedAll &&
      this.state.isChecked
    ) {
      this.setState({
        isChecked: false,
      });
    }
    // handle new isSelectAll
    if (nextProps.isSelectAll !== this.props.isSelectAll) {
      if (!nextProps.isSelectAll) {
        if (
          nextProps.permsControl
            ?.controls.find((e) => e.author_control_id === nextProps.action_id) ==
          undefined
        ) {
          this.setState({
            isChecked: false,
          });
        }
      } else {
        this.setState({
          isChecked: true,
        });
      }
    } else if (
      nextProps.isSelectAll &&
      nextProps.isCheckedAll &&
      !this.state.isChecked
    ) {
      this.setState({
        isChecked: true,
      });
    }
  }

  componentDidMount() {
    const { permsControl, permission_id, action_id, listChecked } = this.props;
    const checkbox = listChecked
      ?.find((e) => e.permission_id === permission_id)
      ?.controls.find((e) => e.control_id === action_id);
    if (checkbox) {
      this.setState({
        isChecked: checkbox.active,
      });
      return;
    }
    if (
      permsControl
        ?.controls.find((e) => e.author_control_id === action_id)
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

  handleChangeCheckbox(event, permissionId, actionId) {

    event.preventDefault();
    const {
      handleChangeCheckboxParent,
      isCheckedAll,
      isUnCheckedAll,
    } = this.props;

    const checked = event.target.checked;
    let reset = false;
    if (isCheckedAll || isUnCheckedAll) {
      reset = true;
    }
    this.setState(
      {
        isChecked: checked,
      },
      () => {
        handleChangeCheckboxParent(permissionId, actionId, checked, reset);
      }
    );
  }
  render() {
    const { permission_id, action_id } = this.props;
    return (
      <Checkbox
        onChange={(event) => {
          this.handleChangeCheckbox(event, permission_id, action_id);
        }}
        checked={this.state.isChecked}
      ></Checkbox>
    );
  }
}
