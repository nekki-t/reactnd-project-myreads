import React from 'react';
import AppBar from 'material-ui/AppBar';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

/*--- Constants ---*/
import {URL, API_BOOK_SHELF_INFO, MENU_BOOK_SHELF_INFO} from './constants';

/*--- Children ---*/
import Navbar from './components/Navbar';
import Current from './components/Current';
import Read from './components/Read';
import Want from './components/Want';
import Search from './components/Search';
import Loading from './components/Loading';
import NotFound from './components/NotFound';

/*--- API ---*/
import * as BooksAPI from './BooksAPI';

import './App.css';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true,
      updating: false,
    };
    this.handleMoveBookTo = this.handleMoveBookTo.bind(this);

  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(
        {
          books,
          loading: false,
        }
      );
    });
  }


  handleMoveBookTo(book, shelf) {
    this.setState({
      updating: true
    });
    BooksAPI.update(book, shelf).then((res) => {
      BooksAPI.getAll().then((books) => {
        this.setState(
          {
            books,
            updating: false
          }
          );
        toast(`"${book.title}" has been moved to ${this.getShelfViewName(shelf)}`);
        console.log(this.state.books);
      });
    });
  }

  getShelfViewName(apiShelfName) {
    switch(apiShelfName) {
      case API_BOOK_SHELF_INFO.CURRENT:
        return MENU_BOOK_SHELF_INFO.CURRENT;
      case API_BOOK_SHELF_INFO.WANT:
        return MENU_BOOK_SHELF_INFO.WANT;
      case API_BOOK_SHELF_INFO.READ:
        return MENU_BOOK_SHELF_INFO.READ;
      default:
        return MENU_BOOK_SHELF_INFO.NONE;
    }
  }

  render() {
    const styles = {};
    styles.appBar = {
      backgroundColor: '#2e7c31',
      textShadow: '2px 2px 2px #000'
    };

    styles.title = {
      ...styles,
      marginRight: 10
    };

    styles.contents = {
      width: '80%',
      margin: '20px auto',
      boxShadow: '1px 1px 5px #4b4b4b',
      backgroundColor: '#fff',
      padding: 0
    };

    styles.openSearchButton = {
      position: 'absolute',
      right: 25,
      bottom: 25
    };

    const title = (
      <div>
        <i className="fa fa-book" aria-hidden="true" style={styles.title}></i>
        MyReads
      </div>
    );

    return (
      <div>
        {(this.state.loading || this.state.updating) &&
          <Loading
            withOverLay={true}
          />
        }
        <ToastContainer
          position="bottom-left"
          type="success"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        {window.location.href.indexOf(URL.SEARCH) < 0 &&
          <AppBar
            title={title}
            showMenuIconButton={false}
            style={styles.appBar}
          />
        }

        <Router>
          <Switch>
          <Route path={URL.SEARCH}  render={(props) => (
            <Search
              books={this.state.books}
              moveBookTo={this.handleMoveBookTo}
            />
          )} />/>
          <Route render={({location, history}) => (
            <div style={styles.contents}>
              <Navbar/>
              <ReactCSSTransitionGroup
                transitionName="transition"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                >
                <Switch
                  location={location}
                  key={location.key}
                >
                  <Route exact path={URL.ROOT} render={(props) => (
                    <Current
                      moveBookTo={this.handleMoveBookTo}
                      books={this.state.books.filter((book) => {
                      return book.shelf === API_BOOK_SHELF_INFO.CURRENT
                    })}/>
                  )} />
                  <Route path={URL.CURRENT}  render={(props) => (
                    <Current
                      moveBookTo={this.handleMoveBookTo}
                      books={this.state.books.filter((book) => {
                      return book.shelf === API_BOOK_SHELF_INFO.CURRENT
                    })}/>
                  )} />/>
                  <Route path={URL.WANT}  render={(props) => (
                    <Want
                      moveBookTo={this.handleMoveBookTo}
                      books={this.state.books.filter((book) => {
                      return book.shelf === API_BOOK_SHELF_INFO.WANT
                    })}/>
                  )} />/>
                  <Route path={URL.READ}  render={(props) => (
                    <Read
                      moveBookTo={this.handleMoveBookTo}
                      books={this.state.books.filter((book) => {
                      return book.shelf === API_BOOK_SHELF_INFO.READ
                    })}/>
                  )} />/>
                  <Route path={URL.NOT_FOUND} component={NotFound}/>
                </Switch>
              </ReactCSSTransitionGroup>
              <FloatingActionButton
                style={styles.openSearchButton}
                href={URL.SEARCH}
              >
                <ContentAdd />
              </FloatingActionButton>
            </div>
          )}/></Switch>
        </Router>
      </div>
    )
  }
}


export default BooksApp
