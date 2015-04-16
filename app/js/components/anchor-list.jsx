'use strict';
var React = require('react');
var UserActions = require('../actions/user-actions');

module.exports = React.createClass({
  componentDidMount: function() {
    UserActions.isValid(true);
  },

  render: function() {
    var img;
    var imageUrl = this.props.imageUrl;
    var links = this.props.movieData.map(function(movie) {
      img = movie.url ? <img alt={movie.name} src={imageUrl + movie.url}/> :
        <img src="./img/logo.png" className="defaultimage"></img>;
      return (
        <li className="searchitems" key={movie.id}>
          {img}
          <a name={movie.id} href="#" onClick={this.props.handleClick}>{movie.name}</a>
        </li>
      );
    }.bind(this));

    return (
      <ul className="searchitemlist">
        {links}
      </ul>
    );
  }
});
