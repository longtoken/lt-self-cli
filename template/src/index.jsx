import React from 'react';
import {render} from 'react-dom';
import RouterMap from './router/routerMap';

import {configure} from 'mobx';// 不允许在action之外的地方更改状态
import {Provider} from 'mobx-react';

configure({enforceActions: "strict"});

import HomeStore from './stores/home';
import UserStore from './stores/user';

global.AJAX = require('./utils/intensifyAjax/index');
global.Common = require('./utils/common/index');

const stores = {
  HomeStore,
  UserStore,
};

render(
  <Provider {...stores}>
    <RouterMap />
  </Provider>,
  document.getElementById('app')
);
