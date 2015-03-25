'use strict';

var React = require('react');
var UserActions = require('../actions/user-actions');

module.exports = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    UserActions.signIn();
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <input type="submit" value="Sign In"/>
      </form>
    );
  }
});
