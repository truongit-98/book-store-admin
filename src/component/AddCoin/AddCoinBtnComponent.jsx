import React, { Component } from 'react';
import { Button, Input, Modal, Tooltip } from 'antd';
import PopupAddCoins from './PopupAddCoins';
import { MdAddCircle } from 'react-icons/md';
import actions from '../../redux/actions/setting_data';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import CoinSettingComponent from './CoinSettingComponent';

class AddCoinBtnComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      ercModalVisible: false,
    };
  }
  
  changePopup = () => {
    this.setState({ ercModalVisible: false, isVisible: true }, () => this.props.fetchErc20Info({
      contract: this.state.address,
    }));
  };
  
  closePopup = (isVisible) => {
    this.setState({
      isVisible,
    });
  };
  
  showErcModal = () => this.setState({ ercModalVisible: true });
  hideErcModal = () => {
    this.setState({ ercModalVisible: false });
  };
  
  onChange = ({ target: { value: address } }) => this.setState({ address });
  
  render() {
    return (
      <>
        <Button onClick={this.showErcModal} style={{ size: '2px' }}><MdAddCircle
          size="20"/>Thêm</Button>
        
        <br/>
        
        <Modal
          visible={this.state.ercModalVisible}
          title="Mẫu lấy thông tin coin erc20"
          onOk={this.changePopup}
          onCancel={this.hideErcModal}
          footer={[
            <Button key="cancel" onClick={this.hideErcModal}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={this.changePopup}>
              Xác nhận
            </Button>,
          ]}
        >
          <Input placeholder="Nhập địa chỉ contract của ERC20" style={{ width: 300 }}
                 onChange={this.onChange}/>
        </Modal>
        
        <PopupAddCoins isVisible={this.state.isVisible} closePopup={this.closePopup}
                       rowUpdate={this.props.erc20TokenInfo}/>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  erc20TokenInfo: isEmpty(state.setting.erc20TokenInfo) ? undefined : {
    coin: state.setting.erc20TokenInfo.Symbol,
    symbol: state.setting.erc20TokenInfo.Symbol,
    decimal: state.setting.erc20TokenInfo.Decimals,
    name: state.setting.erc20TokenInfo.Name,
    contract_address: state.setting.erc20TokenInfo.Contract,
    type: 'erc20',
  },
});

const mapDispatchToProps = (dispatch) => ({
//   userListAction: (params, callback) => {
//     dispatch(actions.userListAction(params, callback));
//   },
  fetchErc20Info: (contract) => {
    dispatch(actions.fetchInfoERC20Action(contract));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCoinBtnComponent);

