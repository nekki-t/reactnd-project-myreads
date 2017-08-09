import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*--- Material UI ---*/
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {MENU_BOOK_SHELF_INFO, API_BOOK_SHELF_INFO} from '../../constants';

class BookGrid extends Component {

  constructor(props) {
    super(props);
    this.moveBookTo = this.moveBookTo.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      modalOpened: false,
      selectedBook: {},
    };
  }

  moveBookTo = (event, book) => {
    let shelf = '';

    if (event.target.textContent === MENU_BOOK_SHELF_INFO.CURRENT) {
      shelf = API_BOOK_SHELF_INFO.CURRENT;
    } else if (event.target.textContent === MENU_BOOK_SHELF_INFO.WANT) {
      shelf = API_BOOK_SHELF_INFO.WANT;
    } else if (event.target.textContent === MENU_BOOK_SHELF_INFO.READ) {
      shelf = API_BOOK_SHELF_INFO.READ;
    } else if (event.target.textContent === MENU_BOOK_SHELF_INFO.SHOW_DETAILS){
      this.setState(
        {
          modalOpened: true,
          selectedBook: book,
        }
      );
      console.log(book);
      return;
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

  category = (book) => {
    if(book.categories && book.categories.length > 0) {
      return book.categories[0];
    } else {
      return ''
    }
  };

  judgeChecked = (book, targetShelf) => {
    if(this.props.searchedBooks && this.props.searchedBooks.length > 0) {
      let target = this.props.books.filter((searchedBook) => {
        return (searchedBook.id === book.id);
      });
      if(target.length > 0) {
        return target[0].shelf === targetShelf;
      } else {
        return false;
      }
    } else {
      return book.shelf === targetShelf;
    }
  };

  handleClose = () => {
    this.setState({
      modalOpened: false,
      selectedBook: {},
    });
  };

  render() {
    const localStyles = {
      gridList: {
        minHeight: 360,
      },
      gridTile: {
        boxShadow: '2px 2px 3px #000'
      },
      tableContainer: {
        width: '100%',
        margin: 5
      },
      table: {
        borderCollapse: 'collapse',
      },
      col: {
        padding: 5,
        border: '1px solid #ccc',
      }
    };

    /*--- Search or Shelves ---*/
    const books = this.props.searchedBooks ? this.props.searchedBooks : this.props.books;

    /*--- Modal Actions ---*/
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

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
        <div>
          <Dialog
            title={this.state.selectedBook.title}
            actions={actions}
            modal={false}
            open={this.state.modalOpened}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{margin: 5}}>
                <img src={this.thumbNail(this.state.selectedBook)} alt="thumbnail" style={{width: 200, height: 300}}/>
              </div>
              <div style={localStyles.tableContainer}>
                <table style={localStyles.table}>
                  <tbody>
                  <tr>
                    <th style={localStyles.col}>Subtitle</th>
                    <td style={localStyles.col}>{this.state.selectedBook.subtitle}</td>
                  </tr>
                  <tr>
                    <th style={localStyles.col}>Author</th>
                    <td style={localStyles.col}>{this.authorName(this.state.selectedBook)}</td>
                  </tr>
                  <tr>
                    <th style={localStyles.col}>Category</th>
                    <td style={localStyles.col}>{this.category(this.state.selectedBook)}</td>
                  </tr>
                  <tr>
                    <th style={localStyles.col}>Published Date</th>
                    <td style={localStyles.col}>{this.state.selectedBook.publishedDate}</td>
                  </tr>
                  <tr>
                    <th style={localStyles.col}>Description</th>
                    <td style={localStyles.col}>{this.state.selectedBook.description}</td>
                  </tr>
                  </tbody>

                </table>
              </div>

            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

BookGrid.propTypes = {
  books: PropTypes.array.isRequired,
  searchedBooks: PropTypes.array,
  moveBookTo: PropTypes.func.isRequired,
};

export default BookGrid;
