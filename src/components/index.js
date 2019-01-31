/* eslint-disable react/destructuring-assignment */
import React, {Fragment} from 'react';
import axios from 'axios';
import DevTools from 'mobx-react-devtools';
import ZipCodeItem from './ZipCodeItem';
import SearchArea from './SearchArea';
import Preloader from './Preloader';
// import LangFlags from './LangFlags';
import {generateUniqueId} from '../helpers/index';
// import ErrorBoundary from '../HOCs/ErrorBoundary';

import {observer, inject} from 'mobx-react';

@inject("zipCodeStore")
@observer
class ZiPCodeComponent extends React.Component {

  // input handler
  handleChangeSearch = event => {
    const {setSearchValue, setErrorValue} = this.props.zipCodeStore;
    const target = event.target.value;
    const regExp = new RegExp('^\\d+$');

    // maximum 5 characters
    if (target.length > 5) {
      return;
    }

    // type only numbers
    if (regExp.test(target) || target === '') {
      setSearchValue(target);
    } else {
      setErrorValue('Please type only numbers');
      return;
    }

    // notification to user about not correct input
    if (target.length !== 5 && target.length !== 0) {
      setErrorValue('Please type 5-digit code');
    } else {
      setErrorValue('');
    }
  };

  removeItem = (ev, el) => {
    ev.stopPropagation();

    const {setZipCodeItems, getZipCodeItems, setCurrentItem} = this.props.zipCodeStore;
    setZipCodeItems(getZipCodeItems.filter(item => el._id !== item._id));
    setCurrentItem({});
  };

  selectItem = replyItem => {
    const {setSearchValue, setErrorValue, getCurrentItem, setCurrentItem} = this.props.zipCodeStore;
    // check item, selected or not
    const isAlreadySelected = getCurrentItem['post code'] === replyItem['post code'];

    if (isAlreadySelected) {
      setSearchValue('');
      setErrorValue('');
      setCurrentItem({});
    } else {
      setSearchValue(replyItem['post code']);
      setCurrentItem(replyItem);
    }
  };

  searchHandlerEnter = e => {
    if (e.key === 'Enter') {
      this.searchHandler();
    }
  };

  searchHandler = () => {
    const {getSearchValue} = this.props.zipCodeStore;
    // fire search only if input has correct zip code
    if (getSearchValue.length === 5) {
      this.getNewData();
    }
  };

  getNewData = async () => {
    const {setZipCodeItems, getZipCodeItems, getFetchingState, addZipCodeItem, getSearchValue, setCurrentItem, getCurrentItem} = this.props.zipCodeStore;
    // prevent fetching new data if user are fetching data now
    if (!getFetchingState) {
      this.props.zipCodeStore.setFetchingState(true);
      try {
        const result = await axios({
          method: 'get',
          url: `https://api.zippopotam.us/us/${getSearchValue}`,
        });

        // if application has correct response
        if (result.status === 200) {
          const isPostCodeExists = getZipCodeItems.some(
            el => el['post code'] === result.data['post code'],
          );

          // create or change exists item
          if (!isPostCodeExists) {
            if (!getCurrentItem._id) {
              // add new item
              addZipCodeItem({...result.data, _id: generateUniqueId()});
            } else {
              // update exists item
              setZipCodeItems(getZipCodeItems.map(el =>
                el._id === getCurrentItem._id ? {...result.data, _id: getCurrentItem._id} : el,
              ));
            }
            setCurrentItem({});
          }

          // generate error text for user
          let searchError = '';
          if (isPostCodeExists) {
            searchError = 'Post code already exists';
          }
          this.props.zipCodeStore.setFetchingState(false);
          this.props.zipCodeStore.setSearchValue('');
          this.props.zipCodeStore.setErrorValue(searchError);

        } else {
          this.props.zipCodeStore.setErrorValue('Something wrong with connection!');
          this.props.zipCodeStore.setFetchingState(false);
        }
      } catch (er) {
        console.log(er.response || er);
        let searchError = '';
        if (er.response && er.response.data && er.response.data['post code'] === undefined) {
          searchError = "Post code wasn't found";
        }
        this.props.zipCodeStore.setErrorValue(searchError);
        this.props.zipCodeStore.setFetchingState(false);
      }
    }
  };

  render() {
    let {getZipCodeItems, getFetchingState, getSearchValue, getSearchError, getCurrentItem} = this.props.zipCodeStore;
    return (
      <Fragment>
        {/*<ErrorBoundary>*/}
        {/*<LangFlags />*/}
        {/*</ErrorBoundary>*/}
        <div className="zipCodeCont">
          <div className="zipCodeCont_body">
            <div className="zipCodeCont_body_list">
              <div className="zipCodeCont_body_list_searchErrors">
                {getSearchError.length ? <span>{getSearchError}</span> : null}
              </div>
              <div className="zipCodeCont_body_list_search_container_wrapper">
                <SearchArea
                  searchValue={getSearchValue}
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
                      <Preloader height="24px"/>
                    </div>
                  ) : null}

                  {getZipCodeItems.map(el => {
                    return <ZipCodeItem
                      key={el['post code']}
                      el={el}
                      currentItem={getCurrentItem}
                      selectItem={this.selectItem}
                      removeItem={this.removeItem}
                    />
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <DevTools/>
      </Fragment>
    );
  }
}

export default ZiPCodeComponent;
