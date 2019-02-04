import React from 'react';
import PropTypes from 'prop-types';
// import mobx from 'mobx';
import { observer } from 'mobx-react';
class ZipCodeItem extends React.Component {
  componentDidMount() {}

  userClicked = () => {
    this.props.selectItem(this.props.el)
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.el._id !== this.props.el._id || nextProps.currentItem._id !== this.props.currentItem._id) {
      return true;
    }
    return false;
  }

  render() {
    const { el, currentItem, removeItem} = this.props;
    const isActive = { backgroundColor: el._id === currentItem._id ? '#3dce78' : ''};
    return (
      <div
        className="zipCodeCont_body_list_item"
        onClick={this.userClicked}
        style={isActive}
      >
        <div className="itemLeft">
          <div className="zipCodeCont_body_list_item_logo">
            <img
              alt=""
              src="/static-files/help-Circle.png"
              className="zipCodeCont_body_list_item_logo_img"
            />
          </div>
          <div className="zipCodeCont_body_list_item_text noWrap">
            <span>
              {el.places[0]['place name']},{el.places[0]['state abbreviation']}
            </span>
          </div>
        </div>

        <div
          className="itemRemove"
          onClick={e => {
            removeItem(e, el);
          }}
        >
          Remove item
        </div>
      </div>
    );
  }
}

export default ZipCodeItem;

ZipCodeItem.propTypes = {
  el: PropTypes.object,
  currentItem: PropTypes.object,
  selectItem: PropTypes.func,
  removeItem: PropTypes.func,
};

ZipCodeItem.defaultProps = {
  el: {},
  currentItem: {},
  selectItem: () => {},
  removeItem: () => {},
};
