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

  var filler = !(this.props.movieData[0]) ? (
    <div>
      <img src="./img/logo.png" className="filler" alt="Logo image"></img>
    </div>
  ) : '';
  var list = this.props.listType === 'searchlist' ?
    <SearchList movieData={this.props.movieData} searchData={this.props.searchData}
      sublist={this.props.sublist} imageUrl={this.props.imageUrl}/>
    : <AnchorList handleClick={this.handleMovieClick} movieData={this.props.movieData} imageUrl={this.props.imageUrl}/>;

    return (
    <div className="anchorcontainer">
      <MovieSearch movieData={this.props.movieData} />
      {list}
      {filler}
    </div>
    );
  }
});
