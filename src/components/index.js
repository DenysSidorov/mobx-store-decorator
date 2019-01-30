/* eslint-disable react/destructuring-assignment */
import React, {Fragment} from 'react';
import axios from 'axios';
import mobx, {observable} from 'mobx';
import DevTools from 'mobx-react-devtools';
import ZipCodeItem from './ZipCodeItem';
import SearchArea from './SearchArea';
import Preloader from './Preloader';
// import LangFlags from './LangFlags';
import cities from '../api/mocks/cities';
import {generateUniqueId} from '../helpers/index';
// import ErrorBoundary from '../HOCs/ErrorBoundary';

import { observer, inject } from 'mobx-react';

@inject("zipCodeStore")
@observer class ZiPCodeComponent extends React.Component {
  state = {
    currentItem: {},
    searchValue: '',
    searchError: '',
    // isFetching: false,
    zipCodeItems: [],
  };

  // input handler
  handleChangeSearch = event => {
    const target = event.target.value;
    const regExp = new RegExp('^\\d+$');

    // maximum 5 characters
    if (target.length > 5) {
      return;
    }

    // type only numbers
    if (regExp.test(target) || target === '') {
      this.setState({searchValue: target});
    } else {
      this.setState({searchError: 'Please type only numbers'});
      return;
    }

    // notification to user about not correct input
    if (target.length !== 5 && target.length !== 0) {
      this.setState({searchError: 'Please type 5-digit code'});
    } else {
      this.setState({searchError: ''});
    }
  };

  removeItem = (ev, el) => {
    ev.stopPropagation();

    const {setZipCodeItems, getZipCodeItems} = this.props.zipCodeStore;
    setZipCodeItems(getZipCodeItems.filter(item => el._id !== item._id));

    this.setState((prevState /* props */) => ({
      // zipCodeItems: prevState.zipCodeItems.filter(item => el._id !== item._id),
      currentItem: {},
    }));
  };

  selectItem = replyItem => {
    console.log('replyItem ', replyItem);
    // check item, selected or not
    const isAlreadySelected = this.state.currentItem['post code'] === replyItem['post code'];
console.log(isAlreadySelected);
    if (isAlreadySelected) {
      this.setState({
        currentItem: {},
        searchValue: '',
        searchError: '',
      });
    } else {
      this.setState({
        currentItem: replyItem,
        searchValue: replyItem['post code'],
      });
    }
  };

  searchHandlerEnter = e => {
    if (e.key === 'Enter') {
      this.searchHandler();
    }
  };

  searchHandler = () => {
    // fire search only if input has correct zip code
    if (this.state.searchValue.length === 5) {
      this.getNewData();
    }
  };

  getNewData = async () => {
    const {setZipCodeItems, getZipCodeItems, getFetchingState, addZipCodeItem} = this.props.zipCodeStore;
    const {searchValue, currentItem} = this.state;
    // prevent fetching new data if user are fetching data now
    if (!getFetchingState) {
      // this.setState({isFetching: true});
      this.props.zipCodeStore.setFetchingState(true);
      try {
        const result = await axios({
          method: 'get',
          url: `https://api.zippopotam.us/us/${searchValue}`,
        });

        // if application has correct response
        if (result.status === 200) {
          const isPostCodeExists = getZipCodeItems.some(
            el => el['post code'] === result.data['post code'],
          );

          // create or change exists item
          if (!isPostCodeExists) {
            if (!currentItem._id) {
              console.log(1111);
              // add new item
              addZipCodeItem({...result.data, _id: generateUniqueId()});
              console.log(1111, getZipCodeItems);
            } else {
              console.log(33333);
              // update exists item
              // todo fix it need only one object, now app uses map - it's not ok (we have two items instead in our case)
              addZipCodeItem(getZipCodeItems.map(el =>
                el._id === currentItem._id ? {...result.data, _id: currentItem._id} : el,
              ));
              console.log(3333, getZipCodeItems);
            }
          }

          // generate error text for user
          let searchError = '';
          if (isPostCodeExists) {
            searchError = 'Post code already exists';
          }
          this.props.zipCodeStore.setFetchingState(false);
          this.setState({
            // isFetching: false,
            searchValue: '',
            searchError,
            // zipCodeItems: newData,
          });
        } else {
          this.setState({searchError: 'Something wrong with connection!'});
          this.props.zipCodeStore.setFetchingState(false);
        }
      } catch (er) {
        console.log(er.response || er);
        let searchError = '';
        if (er.response && er.response.data && er.response.data['post code'] === undefined) {
          searchError = "Post code wasn't found";
        }
        this.setState({searchError});
        this.props.zipCodeStore.setFetchingState(false);
      }
    }
  };

  render() {
    const {currentItem} = this.state;
    let {getZipCodeItems, getFetchingState} = this.props.zipCodeStore;
    getZipCodeItems = mobx.toJS(getZipCodeItems);
    console.log('----- ', getZipCodeItems);
    return (
      <Fragment>
        {/*<ErrorBoundary>*/}
          {/*<LangFlags />*/}
        {/*</ErrorBoundary>*/}
        <div className="zipCodeCont">
          <div className="zipCodeCont_body">
            <div className="zipCodeCont_body_list">
              <div className="zipCodeCont_body_list_searchErrors">
                {this.state.searchError.length ? <span>{this.state.searchError}</span> : null}
              </div>
              <div className="zipCodeCont_body_list_search_container_wrapper">
                <SearchArea
                  searchValue={this.state.searchValue}
                  handleChangeSearch={this.handleChangeSearch}
                  searchHandlerEnter={this.searchHandlerEnter}
                />
                <div
                  className="zipCodeCont_body_list_search_container_wrapper_btn"
                  onClick={this.searchHandler}
                >
                  <span>Go</span>
                </div>
              </div>

              {(getZipCodeItems && getZipCodeItems.length) || getFetchingState /*this.state.isFetching*/ ? (
                <div className="zipCodeCont_body_list_items_container scrollStylesRD">
                  {getFetchingState ? (
                    <div className="zipCodeCont_body_list_items_container_preloader">
                      <Preloader height="24px" />
                    </div>
                  ) : null}

                  {getZipCodeItems.map(el => {
                    console.log(' ==== ', el);
                    return <ZipCodeItem
                      key={el['post code']}
                      el={el}
                      currentItem={currentItem}
                      selectItem={this.selectItem}
                      removeItem={this.removeItem}
                    />
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <DevTools />
      </Fragment>
    );
  }
}

export default ZiPCodeComponent;
