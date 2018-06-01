import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {Button, Toast, WhiteSpace} from 'antd-mobile';

import Header from 'components/Header';
import Banner from 'components/Banner';
import HomeLink from 'components/HomeLink';

@inject('HomeStore')
@withRouter
@observer
class Home extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.HomeStore.getUserName();
  }

  render() {
    return (
      <section className="home">
        <Header>
          <h3>home</h3>
        </Header>
        <Banner />
        <WhiteSpace />
        <HomeLink store={this.props.HomeStore}/>
      </section>
    );
  }
}

export default Home;