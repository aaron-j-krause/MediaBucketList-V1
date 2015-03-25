'use strict';
var React = require('react');
var MovieActions = require('../actions/movie-actions');
var UserActions = require('../actions/user-actions');
var MovieSearch = require('./movie-search.jsx');
var AnchorList = require('./anchor-list.jsx');
var SearchList = require('./search-list.jsx');

module.exports = React.createClass({
  handleMovieClick: function(event) {
    event.preventDefault();

    var handlers = {
      movies: MovieActions.getMovieById,
      actors: MovieActions.getMoviesByPersonId,
      tv: MovieActions.getSeasonByShowId
    };

    handlers[this.props.listType](event.target.name);
  },

  componentDidMount: function() {
    UserActions.isValid(true);
  },

  render: function() {
  var list = this.props.listType === 'searchlist' ?
    <SearchList movieData={this.props.movieData} searchData={this.props.searchData} />
    : <AnchorList handleClick={this.handleMovieClick} movieData={this.props.movieData} />;
    return (
    <div>
      <MovieSearch movieData={this.props.movieData} />
      {list}
    </div>
    );
  }
});
