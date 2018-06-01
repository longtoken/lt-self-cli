import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Icon} from 'antd-mobile';
import 'static/styles/common.scss';
import 'static/styles/home.scss';
import 'static/styles/user.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitDone: false
    }
  }

  componentDidMount() {
    // 更新加载中状态
    this.setState({
      isInitDone: true
    });
  }

  render() {
    return (
      this.state.isInitDone
        ?
        this.props.children
        :
        <Icon type="loading"/>
    );
  }
}


export default withRouter(App);