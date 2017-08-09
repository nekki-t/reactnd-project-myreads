import React, {Component} from 'react';
import Bookshelf from '../Bookshelf';
import {MENU_BOOK_SHELF_INFO} from '../../constants';

class Want extends Component {
  render() {
    return (
      <Bookshelf
        title={MENU_BOOK_SHELF_INFO.WANT}
        books={this.props.books}
        moveBookTo={this.props.moveBookTo}
        noRecordImage="images/want.jpeg"
      />
    );
  }
}

export default Want;