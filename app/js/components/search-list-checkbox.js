var React = require('react');
var MovieActions = require('../actions/movie-actions');

module.exports = React.createClass({
  handleChange: function(event) {
    var payload = {
      movie: this.props.movieData,
      checked: event.target.checked
    };
    MovieActions.searchListModifyItem(payload);
  },

  render: function() {
    var movieData = this.props.movieData;
    var title = movieData.title ? movieData.title : movieData.name;
    return (
      <label><input name={title} value={title}
        onChange={this.handleChange} type="checkbox"/>{title}<br/></label>
    );
  }
});
