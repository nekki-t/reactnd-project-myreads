import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BookGrid from '../BookGrid';

class Bookshelf extends Component {

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
      img: {
        boxShadow: '2px 2px 3px #ccc'
      }
    };

    return (
      <div style={localStyles.content}>
        <h2 style={localStyles.title}>{this.props.title}</h2>
        {this.props.books.length > 0 &&
          <BookGrid
            books={this.props.books}
            moveBookTo={this.props.moveBookTo}
          />
        }
        {this.props.books.length === 0 &&
          <div style={{textAlign: 'center'}}>
            <h2>No Books in this shelf...</h2>
            <img
              src={this.props.noRecordImage}
              alt={this.props.title}
              style={localStyles.img}
            />
          </div>

        }
      </div>
    );
  }
}

Bookshelf.propTypes = {
  styles: PropTypes.object,
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
  noRecordImage: PropTypes.string,
  moveBookTo: PropTypes.func.isRequired,
};


export default Bookshelf;