import React from 'react';
import PropTypes from 'prop-types';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import '../styles/App.scss';
import { Button, Layout } from 'antd';
import { LOGOUT } from '../redux/actions/user/action_types';

const Header = ({
  collapsed,
  handleLogOut,
  // rtl,
  // image,
  // handleToggleSidebar,
  handleCollapsedChange,
  // handleRtlChange,
  // handleImageChange,
  title,
}) => (
  <Layout.Header className="layout-header">
    <main className="header">
      {/* <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div> */}
      <div className="block">
        <FaBars
          size={30}
          color="#ADADAD"
          onClick={handleCollapsedChange}
          checked={collapsed}
          cursor="pointer"
        />
        <h2 className="title-header">{title.toUpperCase()}</h2>
        <div className="wrap-button">
          <FaSignOutAlt size={30} />
          <Button className="button" onClick={handleLogOut}> Đăng Xuất </Button>
        </div>
      </div>
      {/* <div className="block">
        <Switch
          height={16}
          width={30}
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={handleRtlChange}
          checked={rtl}
          onColor="#219de9"
          offColor="#bbbbbb"
        />
        <span>
          {' '}
          {intl.formatMessage({ id: 'rtl' })}
        </span>
      </div>
      <div className="block">
        <Switch
          height={16}
          width={30}
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={handleImageChange}
          checked={image}
          onColor="#219de9"
          offColor="#bbbbbb"
        />
        <span>
          {' '}
          {intl.formatMessage({ id: 'image' })}
        </span>
      </div> */}

      {/* <footer>
        <small>
          © 2020 made with
          {' '}
          <FaHeart style={{ color: 'red' }} />
          {' '}
          by -
          {' '}
          <a target="_blank" rel="noopener noreferrer" href="https://azouaoui.netlify.com">
            Mohamed Azouaoui
          </a>
        </small>
        <br />
        <div className="social-bagdes">
          <a href="https://github.com/azouaoui-med" target="_blank" rel="noopener noreferrer">
            <img
              alt="GitHub followers"
              src="https://img.shields.io/github/followers/azouaoui-med?label=github&style=social"
            />
          </a>
          <a href="https://twitter.com/azouaoui_med" target="_blank" rel="noopener noreferrer">
            <img
              alt="Twitter Follow"
              src="https://img.shields.io/twitter/follow/azouaoui_med?label=twitter&style=social"
            />
          </a>
        </div>
      </footer> */}
    </main>
  </Layout.Header>
);

Header.propTypes = {
  collapsed: PropTypes.bool,
  // rtl: PropTypes.bool,
  // image: PropTypes.bool,
  // handleToggleSidebar: PropTypes.func,
  handleCollapsedChange: PropTypes.func,
  // handleRtlChange: PropTypes.func,
  // handleImageChange: PropTypes.func,
};

Header.defaultProps = {
  collapsed: false,
  // rtl: false,
  // image: true,
  // handleToggleSidebar: undefined,
  handleCollapsedChange: undefined,
  // handleRtlChange: undefined,
  // handleImageChange: undefined,
};

export default Header;
