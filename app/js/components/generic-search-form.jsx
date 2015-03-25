'use strict';
var React = require('react');
var MovieActions = require('../actions/movie-actions');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      movieName: '',
      personName: '',
      tvName: ''
    };
  },

  handleChange: function(event) {
    var field = event.target;
    var state = this.state;
    state[field.name] = field.value;
    this.setState(state);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var state = this.state;
    var handlers = {
      movieName: MovieActions.getMoviesByName,
      tvName: MovieActions.getTvShowsByName,
      personName: MovieActions.getPeople
    };

    handlers[event.target.name](state[event.target.name]);
    this.setState({
      movieName: '',
      tvName: '',
      personName: ''
    });
  },

  render: function() {
    return (
    <div>
      <form name="movieName" onSubmit={this.handleSubmit}>
        <input type="text" name="movieName" placeholder="Search By Movie Name"
          onChange={this.handleChange} value={this.state.movieName}/>
        <input type="submit" name="movie-search" value="Search"/>
      </form>

      <form name="tvName" onSubmit={this.handleSubmit}>
        <input type="text" name="tvName" placeholder="Search By TV Show Name"
          onChange={this.handleChange} value={this.state.tvName}/>
        <input type="submit" name="movie-search" value="Search"/>
      </form>

      <form name="personName" onSubmit={this.handleSubmit}>
        <input type="text" name="personName" placeholder="Search By Person Name"
          onChange={this.handleChange} value={this.state.personName}/>
        <input type="submit" name="movie-search" value="Search"/>
      </form>
    </div>
    );
  }
});
