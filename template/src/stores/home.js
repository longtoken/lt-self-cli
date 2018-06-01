import {observable, action, reaction, runInAction} from 'mobx';

class HomeStore {
  @observable userName = '';

  @action getUserName() {
    setTimeout(() => {
      runInAction(() => {
        this.userName = 'Jack';
      });
    }, 300);
  }
}

export default new HomeStore();
