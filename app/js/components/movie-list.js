var React = require('react');
var objectFilter = require('../../../lib/movie-db/object-filter');
var Movie = require('./movie');

module.exports = React.createClass({

  render: function() {
    var moviesFiltered = objectFilter(this.props.movieData, ['title', 'id'])
    var movies = moviesFiltered.map(function(movie) {
      return (
        <Movie key={movie.id} movieData={movie}/>
      )
    })
    return (
      <ul>
        {movies}
      </ul>
    );
  }
})