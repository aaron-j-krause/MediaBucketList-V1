var React = require('react');
var MovieActions = require('../actions/movie-actions');

module.exports = React.createClass({
  getInitialState: function() {
    return {movieName: ''}
  },
  handleChange: function(event) {
    var field = event.target
    var state = this.state;
    state[field.name] = field.value;
    this.setState(state);

  },
  handleSubmit: function(event) {
    event.preventDefault();
    var state = this.state;
    MovieActions.getMoviesByName(state.movieName);
    state.movieName = '';
    this.setState({movieName: ''});

  },
  render: function() {
    return (
    <form name="movie-search" onSubmit={this.handleSubmit}>
      <input type="text" name="movieName" onChange={this.handleChange}/>
      <input type="submit" name="movie-search" value="Search"/>
    </form>
    )
  }
});
