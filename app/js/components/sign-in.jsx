'use strict';

var React = require('react');
var UserActions = require('../actions/user-actions');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    };
  },

  handleChange: function(event) {
    var state = this.state;
    var field = event.target;
    state[field.name] = field.value;
    this.setState(state);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var state = this.state;
    UserActions.signIn(state);
    this.setState({
      username: '',
      password: ''
    });
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="username" onChange={this.handleChange}
          name="username" value={this.state.username}/>
        <input type="password" placeholder="password" onChange={this.handleChange}
          name="password" value={this.state.password}/>
        <input type="submit" value="Sign In"/>
      </form>
    );
  }
});
