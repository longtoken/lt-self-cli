import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {List, Checkbox} from 'antd-mobile';
import Header from 'components/Header';

const CheckboxItem = Checkbox.CheckboxItem;

@inject('UserStore')
@withRouter
@observer
class User extends Component {
  constructor(props) {
    super(props);
    this.staticValue = {
      data: [
        { value: 0, label: 'Ph.D.' },
        { value: 1, label: 'Bachelor' },
        { value: 2, label: 'College diploma' },
      ],
    };
  }

  onChange = (val) => {
    console.log(val);
  }

  render() {
    let {data} = this.staticValue;
    return (
      <section className="main user">
        <Header>
          <h3>user</h3>
        </Header>
        <List renderHeader={() => 'CheckboxItem demo'}>
          {data.map(i => (
            <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
              {i.label}
            </CheckboxItem>
          ))}
          <CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
            Undergraduate<List.Item.Brief>Auxiliary text</List.Item.Brief>
          </CheckboxItem>
        </List>
      </section>
    );
  }
}

export default User;