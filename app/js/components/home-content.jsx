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
      <main>
        <p>
          Come back you fool!
        </p>
        {filler}
      </main>
    );
  }
});

module.exports = HomeContent;
