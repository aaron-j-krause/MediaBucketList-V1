'use strict';
var React = require('react');
var Movie = require('./movie.jsx');

module.exports = React.createClass({

  render: function() {
    var movies = this.props.movieData.map(function(movie) {
      return (
        <Movie key={movie.id} movieData={movie}/>
      );
    });
    return (
      <ul>
        {movies}
      </ul>
    );
  }
});
