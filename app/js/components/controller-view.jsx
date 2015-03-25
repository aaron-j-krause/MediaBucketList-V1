'use strict';
var React = require('react');
var MovieStore = require('../stores/movie-store');
var SearchView = require('./search-view.jsx');

var getControllerState = function() {
  return {
    movieData: MovieStore.getMovies(),
    searchList: MovieStore.getList(),
    loggedIn: MovieStore.getSession(),
    listType: MovieStore.getListType()
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
    this._onChange();
  },

  componentWillUnmount: function() {
    MovieStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getControllerState());
  },

  render: function(){
    return (
      <main>
        <SearchView movieData={this.state.movieData} listType={this.state.listType}
          searchData={this.state.searchList} />
      </main>
    );
  }
});
