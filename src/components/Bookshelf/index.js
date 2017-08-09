import React, {Component} from 'react';
import PropTypes from 'prop-types';


import {MENU_BOOK_SHELF_INFO, API_BOOK_SHELF_INFO} from '../../constants';

import BookGrid from '../BookGrid';

class Bookshelf extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const localStyles = {
      content: {
        padding: 10,
      },
      title: {
        borderBottom: '1px solid #ccc',
        fontFamily: "'Great Vibes', cursive",
        textShadow: '2px 2px 2px #ccc'
      },
    };

    return (
      <div style={localStyles.content}>
        <h2 style={localStyles.title}>{this.props.title}</h2>
        <BookGrid
          books={this.props.books}
          moveBookTo={this.props.moveBookTo}
        />
      </div>
    );
  }
}

Bookshelf.propTypes = {
  styles: PropTypes.object,
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
  moveBookTo: PropTypes.func.isRequired,
};


export default Bookshelf;