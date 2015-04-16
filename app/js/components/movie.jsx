'use strict';
var React = require('react');

//child of MovieList
var Movie = React.createClass({
  render: function() {
    var imageData = this.props.imageData;
    var movieData = this.props.movieData;
    var url = imageData + movieData.url;
    var imgTag = movieData.url ? <img src={url} alt={movieData.name}/> : '';

    return (
      <div className="searchitems">
        {imgTag}
        <li>{movieData.name}</li>
        <input type="checkbox"/>
      </div>
    );
  }
});

module.exports = Movie;
