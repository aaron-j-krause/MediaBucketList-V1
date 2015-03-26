'use strict';
var React = require('react');
var SignIn = require('./sign-in.jsx');
var About = require('./about.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      view: 'home'
    };
  },

  handleClick: function(event) {
    event.preventDefault();
    this.setState({view: event.target.name});
  },

  render: function() {
    var pageView = this.state.view === 'home' ? <SignIn /> : <About />;
    return (
      <div>
        <nav>
          <a href="#" onClick={this.handleClick} name="home">Home</a>
          <a href="#" onClick={this.handleClick} name="about">About</a>
        </nav>
        {pageView}
      </div>
    );
  }
});
