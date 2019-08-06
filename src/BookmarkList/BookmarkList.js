import React, { Component } from "react";
import BookmarksContext from "../BookmarksContext";
import BookmarkItem from "../BookmarkItem/BookmarkItem";
import "./BookmarkList.css";

//Take NOTE: Only the bookmarks I have created can be deleted. The dummy bookmarks can not be deleted.
class BookmarkList extends Component {
  static defaultProps = {
    bookmarks: []
  };

  static contextType = BookmarksContext;

  render() {
    //const { bookmarks } = this.props;
    const { bookmarks } = this.context;
    console.log(this.context.bookmarks, "bookmarklist bookmakr");
    //with this addition bookmark list showing again
    return (
      <section className="BookmarkList">
        <h2>Your bookmarks</h2>
        <ul className="BookmarkList__list" aria-live="polite">
          {bookmarks.map(bookmark => (
            <BookmarkItem key={bookmark.id} {...bookmark} />
          ))}
        </ul>
      </section>
    );
  }
}

export default BookmarkList;
