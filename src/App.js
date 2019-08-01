import React, { Component } from "react";
import BookmarkContext from "./BookmarksContext";
import { Route } from "react-router-dom";
import AddBookmark from "./AddBookmark/AddBookmark";
import BookmarkList from "./BookmarkList/BookmarkList";
import Nav from "./Nav/Nav";
import config from "./config";
import "./App.css";

class App extends Component {
  state = {
    //bookmarks,
    bookmarks: [],
    error: null
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null
    });
  };

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark]
    });
  };

  //removes bookmark from state
  deleteBookmark = bookmarkId => {
    console.log("bookmarkId: ", bookmarkId);
    const newBookmarks = this.state.bookmarks.filter(
      bm => bm.id !== bookmarkId
    );
    this.setState({
      bookmarks: newBookmarks
    });
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }));
  }

  render() {
    /*const { bookmarks } = this.state;
    -- adding contextValue here and <BookmarkContext.Provider .../> the list of bookmarks isn't showing, nothing even with component created for routing.
    -- a warning to be aware of: Warning: You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored
    */
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark
    };

    return (
      <main className="App">
        <h1>Bookmarks!</h1>
        <BookmarkContext.Provider value={contextValue}>
          <Nav />
          <div className="content" aria-live="polite">
            <Route
              path="/add-bookmark"
              // render={({ history }) => {
              //   return (
              //     <AddBookmark
              //       onAddBookmark={this.addBookmark}
              //       onClickCancel={() => history.push("/")}
              //     />
              //   );
              // }}
              component={AddBookmark}
            />
            <Route
              exact
              path="/"
              // render={({ history }) => {
              //   return <BookmarkList bookmarks={bookmarks} />;
              // }}
              component={BookmarkList}
            />
          </div>
        </BookmarkContext.Provider>
      </main>
    );
  }
}

export default App;
