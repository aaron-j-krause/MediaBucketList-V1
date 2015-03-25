'use strict';
var React = require('react');
var MovieStore = require('../stores/movie-store');
var UserStore = require('../stores/user-store');
var SearchView = require('./search-view.jsx');
var HomeView = require('./home-view.jsx');

var getControllerState = function() {
  return {
    movieData: MovieStore.getMovies(),
    searchData: MovieStore.getList(),
    session: MovieStore.getSession(),
    listType: MovieStore.getListType(),
    signedIn: UserStore.getSignedIn()
  };
};

module.exports = React.createClass({
  getInitialState: function() {
    return getControllerState();
  },

  handleMovieClick: function(event) {
    event.preventDefault();
  },

  componentDidMount: function() {
    MovieStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    this._onChange();
  },

  componentWillUnmount: function() {
    MovieStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getControllerState());
  },

  render: function(){
    var view = this.state.signedIn ? <SearchView movieData={this.state.movieData}
      listType={this.state.listType} searchData={this.state.searchData} /> : <HomeView />;
    return (
      <main>
        {view}
      </main>
    );
  }
});
