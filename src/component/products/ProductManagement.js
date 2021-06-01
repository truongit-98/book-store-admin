import React, { Component } from "react";
import { Table, Upload, Input, Button, Modal, Form, Row, Col, Select, InputNumber } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  CodeSandboxCircleFilled,
} from "@ant-design/icons";
import AddImage from "../AddCoin/AddImage"
import { MdAddCircle } from "react-icons/md";
import _ from "lodash";
import Switch from "react-switch";
import consts from "../../consts";
import utils, { formatCurrency2 } from "../../common/utils";

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

class ListProducts extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      toggledAccount: false,
      totalCount: 0,
      currentPage: 1,
      isLoading: false,
      visible: false,
      visibleModalAdd: false,
      visibleModalBookType: false,
      previewImage: "",
      previewTitle: "",
      previewVisible: false,
      searching: false,
      fileList: [],
      info: {},
      showSeries: false,
      series: [],
      orderVisible: false,
      bookTypeBody: {
        book_type: 0,
        type_name: "",
        episodes: "",
      },
      bookGeneralInfoBody: {
        book_type_id: 0,
        description: "",
        format_id: 0,
        height: 0,
        language: "",
        number_of_page: 0,
        price_cover: 0,
        publisher_id: 0,
        topic_id: 0,
        width: 0
      },
      bookInfoBody: {
        amount: 0,
        book_type_id: 0,
        cover_image: "",
        isbn: "",
        sku: "",
        title: ""
      }
    };
  }

  columns = [
    {
      title: "Tên sách",
      dataIndex: "title",
      key: "title",
      sorter: {
        compare: (a, b) => a.title > b.title,
      },
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Ảnh bìa",
      dataIndex: "cover_image",
      key: "cover_image",
      render:  () => <img style={{width: "70px"}} src='./images/3.jpg' />
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      sorter: {
        compare: (a, b) => a.amount > b.amount,
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      sorter: {
        compare: (a, b) => a.created_at > b.created_at,
      },
      render: (createdAt) => 
        createdAt > 0 ? utils.formatTimeFromUnix(createdAt, "DD/MM/YYYY HH:mm") : '',
    },
    {
      title: "Trạng thái",
      dataIndex: "activate",
      key: "activate",
      render: (isBanned) => (
        <div className="block">
          {/* <span>{LIST_ACTIVE[isBanned]}</span>
          <span> {intl.formatMessage({ id: 'collapsed' })}</span> */}
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


  componentDidMount() {
    this.props.productsListAction(
      {
        pos: 0,
        count: consts.DEFAULT_PAGE_SIZE,
      },
      (data, totalCount) => {
        this.setState({ searchProducts: data, totalCount });
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
      this.props.searchProducts({q}, ()=>{
        this.setState({
          searching: true,
          isLoading: false,
        })
      })
    } else {
      this.props.productsListAction(
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

  toggledModalAdd = () => {
    this.setState({
      visibleModalAdd: !this.state.visibleModalAdd,
    })
  }

  handleSelectBookType = ({value}) => {
    if (value === "3"){
      this.setState({
        visibleModalBookType: true,
        showSeries: false, 
        series: [],
        bookTypeBody: {
          ...this.state.bookTypeBody,
          book_type: 2,
        }
      })
    } else if (value === "2") {
      this.props.fetchBookSeries((data) =>{this.setState({showSeries:true, series: data})})
    } else {
      this.setState({
        showSeries: false, 
        series: [],
        bookTypeBody: {
          ...this.state.bookTypeBody,
          book_type: 1,
        }
      })
    }
  }

  handleSelectBookSeries = ({value}) => {
    this.props.fetchBookSeriesInfo({seriesID: value}, (data)=> console.log(data, "[handleSelectBookSeries]"))
  }

  handleCancelModalBookType = ()=>{
    this.setState({
      visibleModalBookType: false,
    })
  }

  handleChangeInputBookType = (event) => {
    if (_.isInteger(event)){
      this.setState({
        bookTypeBody: {
          ...this.state.bookTypeBody,
          episodes: event,
        }
      })
    } else {
      const {target} = event;
    if (target){
      const {name, value} = target
      this.setState({
        bookTypeBody: {
          ...this.state.bookTypeBody,
          [name]: value,
        }
      })
    }
    }
  }

  handleSubmitModalBookType = ()=>{
    alert(JSON.stringify(this.state.bookTypeBody))
  }

  render() {
    console.log("series", this.props.series)
    const { previewImage, previewVisible, previewTitle, orderVisible , totalCount} = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined disabled />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div className="list-user">
        <div className="add-btn">
          <div className="space1" />
          <Button style={{float: "right"}}  onClick={this.toggledModalAdd}>
            <MdAddCircle size="20" className="styled-icon" />
            <span> Thêm sản phẩm </span>
          </Button>
        </div>
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
          dataSource={this.props.listProducts || []}
          columns={this.columns}
          pagination={!this.state.searching ? {
            current: this.state.currentPage,
            onChange: (page, pageSize) => {
              this.props.productsListAction(
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
      <Modal
          width="700px"
          className={'popup-add-coin'}
          title={<h3 style={{marginBottom: 0}}>Sửa đồng mới</h3>}
          visible={this.state.visibleModalAdd}
          // onOk={this.handleOk}
          onCancel={this.toggledModalAdd}
          cancelText={'Hủy'}
          okText={this.props.rowUpdate ? 'Xác nhận' : 'Tạo'}
        >
           <Row >
            <Col  span={10}>
              <div>Loại sách</div>
              <Select
              labelInValue
              defaultValue={{ value: "Chọn loại sách" }}
              style={{ width: 140 }}
              onChange={this.handleSelectBookType}
            >
              <Select.Option value="1">Sách thường</Select.Option>
              <Select.Option value="2">Sách bộ</Select.Option>
            </Select>
            </Col>
            {this.state.showSeries ?  <Col  span={10}>
              <div>Bộ sách</div>
              <Select
              labelInValue
              defaultValue={{ value: "0" }}
              style={{ width: 140 }}
              onChange={this.handleSelectBookSeries}
              >
              <Select.Option value="0">Chọn bộ sách</Select.Option>
              {(this.state.series || []).map((s, i)=>{
                  return (<Select.Option  value={s.id}>{s.type_name}</Select.Option>)
              }) }
            </Select>
            </Col> : ''}
          </Row>
          <Row>
            <Col span={10}>
              <div></div>
              <Input
                placeholder="Nhà Xuất bản"
                //onChange={this.onChangeCoin}
                // value={
                  
                // }
                disabled={!this.state.showSeries}
              />
            </Col>
            <Col span={10} offset={4}>
              <div>Tên đầy đủ</div>
              
              <Input
                placeholder="Tên đầy đủ"
                onChange={this.onChangeName}
                value={!!this.props.isVisible ? this.props.rowUpdate?.name : ''}
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={10}>
              <div>Mạng</div>
              
              <Input
                placeholder="Mạng"
                value={
                  !!this.props.isVisible ? this.props.rowUpdate?.type : ''
                }
              />
            </Col>
            <Col span={10} offset={4}>
              <div>Đơn vị</div>
              <Input
                placeholder="Đơn vị"
                disabled={true}
                value={
                  !!this.props.isVisible ? this.props.rowUpdate?.coin : ''
                }
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={10}>
              <div>Lượng giao dịch tối thiểu</div>
              
              <Input
                placeholder="Lượng giao dịch tối thiểu"
                onChange={this.onChangeMinimumWithdrawal}
                value={
                  !!this.props.isVisible ? this.props.rowUpdate?.minimum_withdrawal : ''
                }
              />
            </Col>
            <Col span={10} offset={4}>
              <div>Phí nạp</div>
              <Input placeholder="Phí nạp" value={'miễn phí'} disabled={true}/>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={10}>
              <div>Phí rút</div>
              <Input
                placeholder="Phí rút"
                onChange={this.onChangeFeeWithdrawal}
                value={!!this.props.isVisible ? this.props.rowUpdate?.fee : ''}
              />
            </Col>
            <Col span={10} offset={4}>
              <div>Địa chỉ hợp đồng</div>
              <Input
                placeholder="Địa chỉ hợp đồng"
                onChange={this.onChangeContractAddr}
                value={
                  !!this.props.isVisible ? this.props.rowUpdate?.contract_address : ''
                }
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={10}>
              <div>Lỗi mã giao dịch</div>
              
              <Input
                placeholder="Lỗi mã giao dịch"
                disabled={true}
              />
            </Col>
            <Col span={10} offset={4}>
              <div>Xem giao dịch hiện tại</div>
              
              <Input
                disabled={true}
                placeholder="Xem giao dịch hiện tại"
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={4}>
              <div>Biểu tượng</div>
              <div>
                {!!this.props.isVisible ?
                  <img src={this.props.rowUpdate.icon_image}
                       alt="avatar"
                       style={{
                         border: 'red solid thin',
                         padding: 5,
                         width: 76,
                         height: 76,
                         objectFit: 'contain'
                       }}/> : <AddImage
                    handleImage={this.handleImage}
                    imageUrl={this.props.rowUpdate?.icon_image}
                  />}
              </div>
            </Col>
            <Col span={5} offset={1}>
              <div>Ghi chú</div>
              
              <Input.TextArea rows={3}/>
            </Col>
          </Row>
        </Modal>
        <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancelPreview}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
          <Modal
            visible={this.state.visibleModalBookType}
            title="Tạo một bộ sách mới"
            okText="Tạo"
            onOk={this.handleSubmitModalBookType}
            onCancel={this.handleCancelModalBookType}
          >
            <Row>
            <Col span={10}>
              <div>Tên bộ sách</div>
              <Input
                name="type_name"
                onChange={this.handleChangeInputBookType}
                placeholder="Tên bộ sách"
              />
            </Col>
            <Col span={10} offset={4}>
              <div>Số tập</div>
              <InputNumber
                name="episodes"
                min="2"
                max="100"
                onChange={this.handleChangeInputBookType}
                placeholder="Số tập"
              />
            </Col>
          </Row>
          <br/>
          </Modal>
      </div>
    );
  }
}

export default ListProducts;
