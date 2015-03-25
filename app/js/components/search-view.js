var React = require('react');
var MovieSearch = require('./movie-search');
var AnchorList = require('./anchor-list');
var MovieActions = require('../actions/movie-actions');
var SearchList = require('./search-list');

module.exports = React.createClass({
  handleMovieClick: function(event) {
    event.preventDefault();
    console.log('list type in search view', this.props.listType);
    var handlers = {
      movies: MovieActions.getMovieById,
      actors: MovieActions.getMoviesByPersonId,
      tv: MovieActions.getSeasonByShowId
    }
    handlers[this.props.listType](event.target.name);
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
