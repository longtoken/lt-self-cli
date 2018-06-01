import React, {Component} from 'react';
import * as styles from './style';
import {Icon} from 'antd-mobile';

class Header extends Component {
  clickHandler() {
    //console.log('click left');
    window.history.back();
  }

  render() {
    return (
      <header className={styles.header}>
        <a className={styles['icon-arrow-left']} onClick={this.clickHandler.bind(this)}>
          <Icon type="left"/>
        </a>
        <i className={styles['space']}>space</i>
        {this.props.children}
        <a className={styles['icon-arrow-right']}>
          <Icon type="ellipsis"/>
        </a>
      </header>
    );
  }
}

export default Header;