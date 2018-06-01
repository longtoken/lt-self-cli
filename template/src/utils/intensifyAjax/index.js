import {Toast} from 'antd-mobile';
import axios from 'axios';

axios.defaults.withCredentials = true;

let AJAX = {
  async GET(options) {
    let {url, success, fail} = options;
    try {
      let axiosPromise = axios.get(url);
      let result = await axiosPromise;
      success(result);
    } catch (err) {
      this.handleError(err, fail);
    }
  },
  handleError(err, fail, loginCallback) {
    if (err === 'timeout') {
      Toast.info('系统超时，请稍后再试');
    } else if (global.Common.isType('Function')(fail)) {
      fail();
    } else {
      let msg = err && err.body;
      let status = err && err.response && err.response.status;
      switch (status) {
        case 401:
          Toast.info('请重新登录！');
          break;
        case 403:
          Toast.info('您没有权限做此操作，请返回重试！');
          break;
        case 404:
          Toast.info('资源没有找到，访问出错！');
          break;
        case 500:
        case 502:
        case 504:
          Toast.info('服务器错误，请稍后再试!');
          break;
        default:
          msg && msg.then(data => {
            Toast.info(data.message);
          });
      }
    }
  }
};

module.exports = AJAX;
