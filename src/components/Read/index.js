import React, {Component} from 'react';
import Bookshelf from '../Bookshelf';
import {MENU_BOOK_SHELF_INFO} from '../../constants';


class Read extends Component {

  render() {
    return (
      <Bookshelf
        title={MENU_BOOK_SHELF_INFO.READ}
        books={this.props.books}
        moveBookTo={this.props.moveBookTo}
        noRecordImage="images/read.jpeg"
      />
    );
  }
}

export default Read;