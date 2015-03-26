'use strict';
var React = require('react');
var UserActions = require('../actions/user-actions');

module.exports = React.createClass({
  componentDidMount: function() {
    UserActions.isValid(true);
  },

  render: function() {
    var title;
    var img;
    var path;
    var imageUrl = this.props.imageUrl;
    var movieData = this.props.movieData;
    console.log('ANCHOR LIST DATA', movieData);
    var links = this.props.movieData.map(function(movie) {
      title = movie.title ? 'title' : 'name';
      path = movie.poster_path ? movie.poster_path : movie.profile_path;
      img = path ? <img alt={title} src={imageUrl + path}/> : '';
      return (
        <li key={movie.id}>
          {img}
          <a name={movie.id} href="#" onClick={this.props.handleClick}>{movie[title]}</a>
        </li>
      );
    }.bind(this));

    return (
      <ul>
        {links}
      </ul>
    );
  }
});
