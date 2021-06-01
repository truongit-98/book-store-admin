import React, { Component } from 'react';
import { get } from 'lodash';
import { Col, Input, Modal, Row } from 'antd';
import AddImage from './AddImage';
import { connect } from 'react-redux';
import actions from '../../redux/actions/setting_data/index';

const { TextArea } = Input;

class PopupAddCoins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleConfirm: false,
      deleteInform: false,
      data: {
        coin: '',
        contract_address: '',
        icon_image: '',
        name: '',
        symbol: '',
        decimal: '',
        minimum_withdrawal: 0,
        fee: 0,
      },
    };
  }
  
  handleOk = (e) => {
    this.setState({
      visibleConfirm: true,
    });
  };
  
  handleCancel = (e) => {
    this.props.closePopup(false);
  };
  
  handleOkConfirm = (e) => {
    this.props.closePopup(false);
    this.setState({
      visibleConfirm: false,
    });
    
    //post data of coin to API
    // await rf.getRequest('SettingRequest').postCoinSetting(this.state.data);
    if (this.props.rowUpdate) {
      this.props.postCoinSetting({ ...this.state.data, ...this.props.rowUpdate });
    } else {
      this.props.postCoinSetting(this.state.data);
    }
    //get data of coin table by dispatch action INIT
    this.props.__INIT__();
  };
  
  handleCancelConfirm = (e) => {
    this.setState({
      visibleConfirm: false,
    });
  };
  
  handleImage = (imageUrl) => {
    let fake_data = this.state.data;
    fake_data.icon_image = imageUrl;
    this.setState({
      data: fake_data,
    });
  };
  
  onChangeCoin = ({ target: { value: coin } }) => {
    this.setState({
      data: {
        ...this.state.data,
        coin,
        symbol: coin
      }
    });
  };
  
  onChangeName = ({ target: { value: name } }) => {
    this.setState({
      data: {
        ...this.state.data,
        name
      }
    });
  };
  
  onChangeContractAddr = ({ target: { value: contract_address } }) => {
    this.setState({
      data: {
        ...this.state.data,
        contract_address
      }
    });
  };
  
  onChangeMinimumWithdrawal = ({ target: { value: minimum_withdrawal } }) => this.setState({
    data: {
      ...this.state.data,
      minimum_withdrawal
    }
  });
  onChangeFee = ({ target: { value: fee } }) => this.setState({
    data: {
      ...this.state.data,
      fee
    }
  });
  
  onChangeFeeWithdrawal = ({ target: { value: fee } }) => this.setState({
    data: {
      ...this.state.data,
      fee
    }
  });
  
  render() {
    return (
      <div>
        <Modal
          width="700px"
          className={'popup-add-coin'}
          title={<h3 style={{marginBottom: 0}}>Sửa đồng mới</h3>}
          visible={this.props.isVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText={'Hủy'}
          okText={this.props.rowUpdate ? 'Xác nhận' : 'Tạo'}
        >
          <Row>
            <Col span={10}>
              <div>Đồng</div>
              <Input
                placeholder="Đồng"
                onChange={this.onChangeCoin}
                value={
                  !!this.props.isVisible ? this.props.rowUpdate?.coin : ''
                }
                disabled={!!this.props.rowUpdate}
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
                {!!this.props.isVisible && get(this.props, 'rowUpdate.icon_image', false) ?
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
              
              <TextArea rows={3}/>
            </Col>
          </Row>
        </Modal>
        {/* confirm */}
        <Modal
          visible={this.state.visibleConfirm}
          onOk={this.handleOkConfirm}
          onCancel={this.handleCancelConfirm}
          cancelText={'Hủy'}
          okText={'Xác nhận'}
        >
          <div>Bạn có chắc muốn lưu thông tin?</div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // coins: state.setting.coins,
});

const mapDispatchToProps = (dispatch) => ({
  __INIT__: () => {
    dispatch({ type: '@@__INIT__' });
  },
  postCoinSetting: (data) => {
    dispatch(actions.postCoinSetting(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PopupAddCoins);
