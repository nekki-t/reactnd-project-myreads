import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*--- API ---*/
import * as BooksAPI from '../../BooksAPI';

/*--- Children ---*/
import BookGrid from '../BookGrid';
import Loading from '../Loading';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedBooks: [],
      searching: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    if(event.target.value.length < 1) {
      this.setState({
        searchedBooks: [],
      });
      return;
    }

    this.setState({
      searchedBooks: [],
      searching: true,
    });

    BooksAPI.search(event.target.value, 100).then((books) => {
      this.setState(
        {
          searchedBooks: books,
          searching: false,
        }
      );
      console.log(books);
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => window.history.back()}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
             NOTES: The search from BooksAPI is limited to a particular set of search terms.
             You can find these search terms here:
             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
             you don't find a specific author or title. Every search is limited by search terms.
             */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.handleOnChange(event)}
            />

          </div>
        </div>
        {this.state.searchedBooks && this.state.searchedBooks.length > 0 &&
          <BookGrid
            books={this.props.books}
            searchedBooks={this.state.searchedBooks}
            moveBookTo={this.props.moveBookTo}
            styles={{marginTop: 60, padding: 20}}
            />
        }

        {this.state.searching &&
          <Loading
            withOverLay={false}
          />
        }

      </div>
    );
  }
}

BookGrid.propTypes = {
  books: PropTypes.array,
  moveBookTo: PropTypes.func.isRequired,
};

export default Search;