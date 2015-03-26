'use strict';
var React = require('react');
var Movie = require('./movie');

module.exports = React.createClass({

  render: function() {
    /* jshint ignore:start */
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
    /* jshint ignore:end */
  }
});
