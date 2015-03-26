'use strict';
var React = require('react');
var UserActions = require('../actions/user-actions');

module.exports = React.createClass({
  handleClick: function() {
    UserActions.signOut();
  },

  handleNav: function(event) {
    event.preventDefault();
    UserActions.navigate(event.target.name);
  },

  render: function() {
    return (
      <nav>
        <a href="#" onClick={this.handleNav} name="profile">profile</a>
        <a href="#" onClick={this.handleNav} name="lists">lists</a>
        <a href="#" onClick={this.handleNav} name="search">search</a>
        <button onClick={this.handleClick}>Sign Out</button>
      </nav>
    );
  }
});
