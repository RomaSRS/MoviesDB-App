import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import './style.css';

export default function MenuBar({ mode, onClickMenu }) {
  const { Item } = Menu;
  return (
    <Menu onClick={evt => onClickMenu(evt.key)} selectedKeys={[mode]} mode="horizontal" className="menu">
      <Item key="search">Search</Item>
      <Item key="rated">Rated</Item>
    </Menu>
  );
}

MenuBar.propTypes = {
  mode: PropTypes.string,
  onClickMenu: PropTypes.func.isRequired,
};

MenuBar.defaultProps = {
  mode: 'search',
};
