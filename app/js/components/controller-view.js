var React = require('react');
var MovieSearchForm = require('./movie-search-form');

module.exports = React.createClass({
  render: function(){
    return (
      <main>
        <p>{movies}</p>
        <MovieSearchForm/>
      </main>

    )
  }
});
