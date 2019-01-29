import {observable, computed, action} from 'mobx';

class ZipCodeStore {

  @observable isFetching;

  constructor() {
    this.isFetching = false;
  }

  @computed
  get getFetchingState() {
    return this.isFetching
  }

  @action('set fetching state')
  setFetchingState = (boolean) => {
    this.isFetching = boolean;
  }

}

const zipCodeStore = new ZipCodeStore();

export default zipCodeStore;