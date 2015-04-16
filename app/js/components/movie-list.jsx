'use strict';
var React = require('react');
var Movie = require('./movie.jsx');

//child of ListView
var MovieList = React.createClass({

  render: function() {
    var listData = this.props.listData;
    var movies = listData.map(function(movie) {
      return (
        <Movie key={movie.id} movieData={movie} imageData={this.props.imageData}/>
      );
    }.bind(this));
    return (
      <div>
      <h2>{this.props.name}</h2>
      <ul className="searchitemlist">
        {movies}
      </ul>
      </div>
    );
  }
});

module.exports = MovieList;
