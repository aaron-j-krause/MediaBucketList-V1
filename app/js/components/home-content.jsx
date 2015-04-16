'use strict';
var React = require('react');

//child of HomeView
var HomeContent = React.createClass({
  render: function() {
  	var filler = (
      <div>
        <img src="./img/logo.png" className="filler" alt="Logo image"></img>
      </div>
    );
    return (
      <p>
        Come back you fool!
        {filler}
      </p>
    );
  }
});

module.exports = HomeContent;
