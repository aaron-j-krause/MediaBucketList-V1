var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
    <form name="movie-search">
      <input type="text" name="movie-search"/>
      <input type="submit" name="movie-search" value="Search"/>
    </form>
    )
  }
});
