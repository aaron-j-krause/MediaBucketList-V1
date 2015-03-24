var React = require('react');
var objectFilter = require('../../../lib/movie-db/object-filter');
var Movie = require('./movie');

module.exports = React.createClass({

  render: function() {
    var movies = this.props.movieData.map(function(movie) {
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