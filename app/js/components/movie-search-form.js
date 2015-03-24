var React = require('react');
var MovieActions = require('../actions/movie-actions');

module.exports = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    MovieActions.testAction();

  },
  render: function() {
    return (
    <form name="movie-search" onSubmit={this.handleSubmit}>
      <input type="text" name="movie-search"/>
      <input type="submit" name="movie-search" value="Search"/>
    </form>
    )
  }
});
