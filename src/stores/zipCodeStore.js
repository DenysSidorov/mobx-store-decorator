import {observable, computed, action, extendObservable} from 'mobx';
import cities from '../api/mocks/cities';

class ZipCodeStore {

  @observable isFetching;
  @observable zipCodeItems;


  constructor(cities = [], initialState = {}) {

    this.isFetching = false;
    this.zipCodeItems = cities;

    extendObservable(this, initialState);
  }

  @computed
  get getFetchingState() {
    return this.isFetching;
  }
  @computed
  get getZipCodeItems() {
    return this.zipCodeItems;
  }

  @action('set fetching state')
  setFetchingState = (boolean) => {
    this.isFetching = boolean;
  }

  @action('set zip code items ')
  setZipCodeItems = (array) => {
    this.zipCodeItems = array;
  }

}

const zipCodeStore = new ZipCodeStore(cities);

export default zipCodeStore;