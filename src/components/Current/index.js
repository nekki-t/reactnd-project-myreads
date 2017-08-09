import React, {Component} from 'react';

import {MENU_BOOK_SHELF_INFO} from '../../constants';

import Bookshelf from '../Bookshelf';

class Current extends Component {


  render() {
    return (
      <Bookshelf
        title={MENU_BOOK_SHELF_INFO.CURRENT}
        books={this.props.books}
        moveBookTo={this.props.moveBookTo}
        noRecordImage="images/current.jpg"
      />
    );
  }
}

export default Current;