var React = require('react');
var MovieSearchForm = require('./movie-search-form');
var MovieStore = require('../stores/movie-store');
var MovieActions = require('../actions/movie-actions');

var getControllerState = function(){
  return {
    movieData: MovieStore.getMovies()
  }
};

module.exports = React.createClass({
  componentDidMount: function(){
    MovieStore.addChangeListener(this._onChange);
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
        <MovieSearchForm/>
      </main>

    )
  }
});
