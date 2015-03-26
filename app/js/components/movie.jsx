'use strict';
var React = require('react');

module.exports = React.createClass({
  render: function() {
    var imageData = this.props.imageData;
    console.log('IMAGEDATA', imageData);
    var movieData = this.props.movieData;
    var url = imageData + movieData.poster_path;
    var title = !!(movieData.title) ? movieData.title : movieData.name;
    return (
      <div>
        <img src={url} alt={title}/>
        <li>{title}</li>
        <input type="checkbox"/>
      </div>
    );
  }
});
