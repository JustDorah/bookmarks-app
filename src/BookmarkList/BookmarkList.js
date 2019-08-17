import React, { Component } from "react";
import BookmarksContext from "../BookmarksContext";
import BookmarkItem from "../BookmarkItem/BookmarkItem";
import PropTypes from "prop-types";
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
    // console.log(this.context.bookmarks, "bookmarklist bookmakr");
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

// BookmarkList.propTypes = {
//   bookmarks: PropTypes.array
// };

//PropTypes gives us the ability to specify the type of element that is allowed in the array. We can use the arrayOf validator for this.
// BookmarkList.propTypes = {
//   bookmarks: PropTypes.arrayOf(PropTypes.object)
// };

//opTypes has a shape validator that gives us the means to specify precisely what we want our object to look like
BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      rating: PropTypes.number,
      description: PropTypes.string
    })
  )
};

export default BookmarkList;
