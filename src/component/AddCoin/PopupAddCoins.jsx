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
          title={<h3 style={{marginBottom: 0}}>S???a ?????ng m???i</h3>}
          visible={this.props.isVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText={'H???y'}
          okText={this.props.rowUpdate ? 'X??c nh???n' : 'T???o'}
        >
          <Row>
            <Col span={10}>
              <div>?????ng</div>
              <Input
                placeholder="?????ng"
                onChange={this.onChangeCoin}
                value={
                  !!this.props.isVisible ? this.props.rowUpdate?.coin : ''
                }
                disabled={!!this.props.rowUpdate}
              />
            </Col>
            <Col span={10} offset={4}>
              <div>T??n ?????y ?????</div>
              
              <Input
                placeholder="T??n ?????y ?????"
                onChange={this.onChangeName}
                value={!!this.props.isVisible ? this.props.rowUpdate?.name : ''}
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={10}>
              <div>M???ng</div>
              
              <Input
                placeholder="M???ng"
                value={
                  !!this.props.isVisible ? this.props.rowUpdate?.type : ''
                }
              />
            </Col>
            <Col span={10} offset={4}>
              <div>????n v???</div>
              <Input
                placeholder="????n v???"
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
              <div>L?????ng giao d???ch t???i thi???u</div>
              
              <Input
                placeholder="L?????ng giao d???ch t???i thi???u"
                onChange={this.onChangeMinimumWithdrawal}
                value={
                  !!this.props.isVisible ? this.props.rowUpdate?.minimum_withdrawal : ''
                }
              />
            </Col>
            <Col span={10} offset={4}>
              <div>Ph?? n???p</div>
              <Input placeholder="Ph?? n???p" value={'mi???n ph??'} disabled={true}/>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={10}>
              <div>Ph?? r??t</div>
              <Input
                placeholder="Ph?? r??t"
                onChange={this.onChangeFeeWithdrawal}
                value={!!this.props.isVisible ? this.props.rowUpdate?.fee : ''}
              />
            </Col>
            <Col span={10} offset={4}>
              <div>?????a ch??? h???p ?????ng</div>
              <Input
                placeholder="?????a ch??? h???p ?????ng"
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
              <div>L???i m?? giao d???ch</div>
              
              <Input
                placeholder="L???i m?? giao d???ch"
                disabled={true}
              />
            </Col>
            <Col span={10} offset={4}>
              <div>Xem giao d???ch hi???n t???i</div>
              
              <Input
                disabled={true}
                placeholder="Xem giao d???ch hi???n t???i"
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={4}>
              <div>Bi???u t?????ng</div>
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
              <div>Ghi ch??</div>
              
              <TextArea rows={3}/>
            </Col>
          </Row>
        </Modal>
        {/* confirm */}
        <Modal
          visible={this.state.visibleConfirm}
          onOk={this.handleOkConfirm}
          onCancel={this.handleCancelConfirm}
          cancelText={'H???y'}
          okText={'X??c nh???n'}
        >
          <div>B???n c?? ch???c mu???n l??u th??ng tin?</div>
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
