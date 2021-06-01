import React, { Component } from 'react';
import { Button, Input, Modal, Table, } from 'antd';
import { MdAddCircle } from 'react-icons/md';

const { TextArea } = Input;

class PermissionActionManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleAddAction: false,
      inputAddAction: "",
      requestAddAction: "",
      descriprionAddAction: "",
    };
  }
  
  columns = [
    {
      title: 'Tên hành động',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: "Action",
      dataIndex: "request",
      key: "request",
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    }
  ];
  componentDidMount() {
    this.props.getAction();
  }
  
  showModalAddAction = () => {
    this.setState({
      visibleAddAction: true,
    });
  };

  deleteAction = async (record) => {
    await this.props.deleteAction(record.id);
  };

  handleOkAddAction = async () => {
    await this.props.postAction(
      this.state.requestAddAction,
      this.state.inputAddAction,
      this.state.descriptionAddAction
    );
    this.setState({
      visibleAddAction: false,
      inputAddAction: "",
      requestAddAction: "",
      descriprionAddAction: "",
    });
  };
  
  handleCancelAddAction = () => {
    this.setState({
      visibleAddAction: false,
    });
  };
  
  render() {
    const { visibleAddAction } = this.state;
    
    return (
      <div className="action-management">
        {/* Button Add */}
        {/* <div className="btn-add">
          <div className="space"/>
          <Button onClick={this.showModalAddAction}>
            <MdAddCircle size="20" className="styled-icon" />
            <span> Thêm hành động </span>
          </Button>
        </div> */}
        
        {/* Table */}
        <div>
          <Table
            dataSource={this.props.currentActions || []}
            columns={this.columns}
            bordered
          />
        </div>
        
        {/* Modal Add Action*/}
          <Modal
            className="modal-add-action"
            visible={visibleAddAction}
            title={"Thêm hành động"}
            okText={"Thêm"}
            cancelText="Hủy"
            onOk={this.handleOkAddAction}
            onCancel={this.handleCancelAddAction}
          >
            <div className="line1">
              <div className="space1">
                Hành động:{" "}
              </div>
              <Input
                value={this.state.inputAddAction}
                onChange={(value) => {
                  this.setState({
                    inputAddAction: value.target.value,
                  });
                }}
              />
              <div className="space2"/>
            </div>
            <div className="line1">
              <div className="space1">Request: </div>
              <Input
                value={this.state.requestAddAction}
                onChange={(value) => {
                  // console.log(value.target.value);
                  this.setState({
                    requestAddAction: value.target.value,
                  });
                }}
              />
              <div className="space2"/>
            </div>
            <div className="line1">
              <div className="space1">Mô tả: </div>
              <TextArea
                rows={4}
                value={this.state.descriprionAddAction}
                onChange={(value) => {
                  this.setState({
                    descriprionAddAction: value.target.value,
                  });
                }}
              />
              <div className="space2" />
            </div>
          </Modal>

        {/* Modal Ban */}
      </div>
    );
  }
}

export default PermissionActionManagement;
