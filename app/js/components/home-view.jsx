'use strict';
var React = require('react');
var SignIn = require('./sign-in.jsx');
var About = require('./about.jsx');
var HomeContent = require('./home-content.jsx');

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
    var pageView = this.state.view === 'home' ? <HomeContent /> : <About />;
    return (
      <div>
        <div className="centered-navigation" role="banner">
          <div className="centered-navigation-wrapper">
            <nav role="navigation">
              <ul className="centered-navigation-menu">
                <li className="nav-link"><a href="#" onClick={this.handleClick} name="home">Home</a></li>
                <li className="nav-link"><a href="#" onClick={this.handleClick} name="about">About</a></li>
                <li className="nav-link"><SignIn /></li>
              </ul>
            </nav>
          </div>
        </div>
        {pageView}
      </div>
    );
  }
});
