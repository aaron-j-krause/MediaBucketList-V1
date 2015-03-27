'use strict';
var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <p>
        We use the movie database API.
        <img src="./img/movieApi.png" className="movieapi" alt="API image"></img>
      </p>
    );
  }
});
