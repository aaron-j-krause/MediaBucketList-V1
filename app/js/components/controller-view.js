var React = require('react');
var MovieSearchForm = require('./movie-search-form');
var MovieStore = require('../stores/movie-store');
var MovieActions = require('../actions/movie-actions');
var MovieList = require('./movie-list')
var SearchList = require('./search-list')

var getControllerState = function(){
  return {
    movieData: MovieStore.getMovies(),
    searchList: MovieStore.getList()
  }
};

module.exports = React.createClass({
  getInitialState: function() {
    return getControllerState();
  },

  componentDidMount: function(){
    MovieStore.addChangeListener(this._onChange);
    this._onChange();
  },

  componentWillUnmount: function() {
    MovieStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getControllerState())
  },

  render: function(){
    return (
      <main>
        <SearchList searchData={this.state.searchList} movieData={this.state.movieData} />
        <MovieSearchForm/>
      </main>
    )
  }
});
