import {observable, computed, action, extendObservable} from 'mobx';
import cities from '../api/mocks/cities';

class ZipCodeStore {

  @observable isFetching = false;
  @observable zipCodeItems = [];
  @observable searchValue = '';
  @observable searchError = '';
  @observable currentItem = {};


  constructor(cities = [], initialState = {}) {
    this.zipCodeItems = observable(cities);
    extendObservable(this, initialState);
  }

  /** ZIP codes - START*/
  @computed
  get getZipCodeItems() {
    return this.zipCodeItems;
  }

  @action('set zip code items ')
  setZipCodeItems = (array) => {
    this.zipCodeItems = array;
  }

  @action('add zip code to items ')
  addZipCodeItem = (zipCodeObject) => {
    this.zipCodeItems.push(zipCodeObject);
  }

  /** ZIP codes - END*/


  /** Fetching state - START*/
  @computed
  get getFetchingState() {
    return this.isFetching;
  }

  @action('set fetching state')
  setFetchingState = (boolean) => {
    this.isFetching = boolean;
  }

  /** Fetching state  - END*/


  /** Current ZIP code - START*/
  @computed
  get getCurrentItem() {
    return this.currentItem;
  }

  @action('set current zip code')
  setCurrentItem = (object) => {
    this.currentItem = object;
  }

  /** Current ZIP code  - END*/


  /** Search value - START*/
  @computed
  get getSearchValue() {
    return this.searchValue;
  }

  @action('set search value')
  setSearchValue = (string) => {
    this.searchValue = string;
  }

  /** Search value  - END*/


  /** Search error - START*/
  @computed
  get getSearchError() {
    return this.searchError;
  }

  @action('set error value')
  setErrorValue = (string) => {
    this.searchError = string;
  }
  /** Search error  - END*/
}

const zipCodeStore = new ZipCodeStore(cities);

export default zipCodeStore;