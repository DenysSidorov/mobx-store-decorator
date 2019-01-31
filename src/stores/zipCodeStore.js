import {observable, computed, action, extendObservable} from 'mobx';
import cities from '../api/mocks/cities';

class ZipCodeStore {

  @observable isFetching = false;
  @observable zipCodeItems = [];


  constructor(cities = [], initialState = {}) {

    this.zipCodeItems = observable(cities);

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
    console.log('ser', array);
    this.zipCodeItems = array;
  }

  @action('add zip code to items ')
  addZipCodeItem = (zipCodeObject) => {
    console.log(' ++++++', zipCodeObject);
    this.zipCodeItems.push(zipCodeObject);
  }

}

const zipCodeStore = new ZipCodeStore(cities);

export default zipCodeStore;