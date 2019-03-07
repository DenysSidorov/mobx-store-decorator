import {observable, computed, action, extendObservable} from 'mobx';
import cities from '../api/mocks/cities';
import axios from 'axios';
import {generateUniqueId} from "../helpers/index";

class ZipCodeStore {

  @observable isFetching = false;
  @observable zipCodeItems = [];
  @observable searchValue = '';
  @observable searchError = '';
  @observable currentItem = {testValue: 'test'};


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

  @action('get new zip codes async')
  getNewData = async () => {
    // prevent fetching new data if user are fetching data now
    if (!this.getFetchingState) {
      this.setFetchingState(true);
      try {
        const result = await axios({
          method: 'get',
          url: `https://api.zippopotam.us/us/${this.getSearchValue}`,
        });

        // if application has correct response
        if (result.status === 200) {
          const isPostCodeExists = this.getZipCodeItems.some(
            el => el['post code'] === result.data['post code'],
          );

          // create or change exists item
          if (!isPostCodeExists) {
            if (!this.getCurrentItem._id) {
              // add new item
              this.addZipCodeItem({...result.data, _id: generateUniqueId()});
            } else {
              // update exists item
              this.setZipCodeItems(this.getZipCodeItems.map(el =>
                el._id === this.getCurrentItem._id ? {...result.data, _id: this.getCurrentItem._id} : el,
              ));
            }
            this.setCurrentItem({});
          }

          // generate error text for user
          let searchError = '';
          if (isPostCodeExists) {
            searchError = 'Post code already exists';
          }
          this.setFetchingState(false);
          this.setSearchValue('');
          this.setErrorValue(searchError);

        } else {
          this.setErrorValue('Something wrong with connection!');
          this.setFetchingState(false);
        }
      } catch (er) {
        console.log(er.response || er);
        let searchError = '';
        if (er.response && er.response.data && er.response.data['post code'] === undefined) {
          searchError = "Post code wasn't found";
        }
        this.setErrorValue(searchError);
        this.setFetchingState(false);
      }
    }
  };
}

// Singleton of this store
const zipCodeStore = new ZipCodeStore(cities);

export default zipCodeStore;