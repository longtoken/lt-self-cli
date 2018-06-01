import React, {Component} from 'react';
import {List} from 'antd-mobile';
import {observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';
const Item = List.Item;

@withRouter
@observer
class HomeList extends Component {
  render() {
    return (
      <section className="home-list">
        <List renderHeader={() => 'all router'}>
          <Item
            thumb="http://www.iconpng.com/png/flatastic1/user-blue.png"
            arrow="horizontal"
            onClick={() => {
              this.props.history.push('user');
            }}
          >{this.props.store.userName}</Item>
        </List>
      </section>
    );
  }
}

export default HomeList;