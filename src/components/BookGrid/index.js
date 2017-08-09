import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import {MENU_BOOK_SHELF_INFO, API_BOOK_SHELF_INFO} from '../../constants';

class BookGrid extends Component {

  constructor(props) {
    super(props);
    this.moveBookTo = this.moveBookTo.bind(this);
  }

  moveBookTo = (event, book) => {
    let shelf = '';

    if (event.target.textContent === MENU_BOOK_SHELF_INFO.CURRENT) {
      shelf = API_BOOK_SHELF_INFO.CURRENT;
    } else if (event.target.textContent === MENU_BOOK_SHELF_INFO.WANT) {
      shelf = API_BOOK_SHELF_INFO.WANT;
    } else if (event.target.textContent === MENU_BOOK_SHELF_INFO.READ) {
      shelf = API_BOOK_SHELF_INFO.READ;
    } else {
      return;
    }

    /*--- same destination ---*/
    if(book.shelf === shelf) {
      return;
    }

    this.props.moveBookTo(book, shelf);
  };

  authorName = (book) => {
    if (book.authors && book.authors.length > 0) {
      return book.authors[0];
    } else if (book.author) {
      return book.author;
    } else {
      return 'Unknown';
    }
  };

  thumbNail = (book) => {
    if (book.imageLinks && book.imageLinks.thumbNail) {
      return book.imageLinks.thumbNail;
    } else if (book.imageLinks && book.imageLinks.smallThumbnail) {
      return book.imageLinks.smallThumbnail;
    } else {
      return 'images/no-image.jpg'
    }
  };

  judgeChecked = (book, targetShelf) => {
    if(this.props.searchedBooks && this.props.searchedBooks.length > 0) {
      let target = this.props.books.filter((searchedBook) => {
        return (searchedBook.id === book.id);
      });
      if(target.length > 0) {
        console.log(target);
        return target[0].shelf === targetShelf;
      } else {
        return false;
      }
    } else {
      return book.shelf === targetShelf;
    }
  };

  render() {
    const localStyles = {
      gridList: {
        minHeight: 360,
      },
      gridTile: {
        boxShadow: '2px 2px 3px #000'
      },
    };

    /*--- Search or Shelves ---*/
    const books = this.props.searchedBooks ? this.props.searchedBooks : this.props.books;

    return (
      <div style={this.props.styles}>
        <GridList
          cellHeight={200}
          cols={4}
          style={localStyles.gridList}
        >
          {books.map((book) => (
            <GridTile
              key={book.id}
              title={book.title}
              subtitle={<span>by <b>{this.authorName(book)}</b></span>}
              actionIcon={
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon color="white"/></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  style={{color: 'white'}}
                  onItemTouchTap={(event) => this.moveBookTo(event, book)}
                >
                  <MenuItem primaryText="Move to" disabled={true}/>
                  <Divider/>
                  <MenuItem
                    primaryText={MENU_BOOK_SHELF_INFO.SHOW_DETAILS}
                  />
                  <Divider/>
                  <MenuItem
                    primaryText={MENU_BOOK_SHELF_INFO.CURRENT}
                    checked={this.judgeChecked(book, API_BOOK_SHELF_INFO.CURRENT)}
                  />
                  <MenuItem
                    primaryText={MENU_BOOK_SHELF_INFO.WANT}
                    checked={this.judgeChecked(book, API_BOOK_SHELF_INFO.WANT)}
                  />
                  <MenuItem
                    primaryText={MENU_BOOK_SHELF_INFO.READ}
                    checked={this.judgeChecked(book, API_BOOK_SHELF_INFO.READ)}
                  />
                  <MenuItem primaryText={MENU_BOOK_SHELF_INFO.NONE}/>
                </IconMenu>
              }
              style={localStyles.gridTile}
            >
              <img src={this.thumbNail(book)} alt="thumbnail"/>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

BookGrid.propTypes = {
  books: PropTypes.array,
  searchedBooks: PropTypes.array,
  moveBookTo: PropTypes.func.isRequired,
};

export default BookGrid;
