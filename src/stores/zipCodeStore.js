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

  @action('set current  zip code')
  setCurrentItem = (object) => {
    this.currentItem = object;
  }

  @action('set search value')
  setSearchValue = (string) => {
    this.searchValue = string;
  }

  @action('set error value')
  setErrorValue = (string) => {
    this.searchError = string;
  }

  @computed
  get getCurrentItem () {
    return this.currentItem;
  }

  @computed
  get getSearchValue () {
    return this.searchValue;
  }

  @computed
  get getSearchError () {
    return this.searchError;
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