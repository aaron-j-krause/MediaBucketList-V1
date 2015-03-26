'use strict';
var React = require('react');
var Movie = require('./movie.jsx');

module.exports = React.createClass({

  render: function() {
    var movies = this.props.listData.map(function(movie) {
      return (
        <Movie key={movie.id} movieData={movie} imageData={this.props.imageData}/>
      );
    }.bind(this));
    return (
      <ul>
        {movies}
      </ul>
    );
  }
});
