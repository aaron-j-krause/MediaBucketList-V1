'use strict';
var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
    	<div>	
	      <footer name="footer" className="footer" role="contentinfo">
			  <div name="footer-logo">
			    <img src="./img/logo.png" className="logo" alt="Logo image"></img>
			  </div>
			  <div name="footer-links">
			    <ul>
			      <li><h3>BucketList Team</h3></li>
			      <li><a href="#">About</a></li>
			      <li><a href="#">Contact</a></li>
			    </ul>
			    <ul>
			      <li><h3>Follow Us</h3></li>
			      <li><a href="#">Twitter</a></li>
			      <li><a href="#">Facebook</a></li>
			      <li><a href="#">YouTube</a></li>
			    </ul>
			    <ul>
			      <li><h3>Legal</h3></li>
			      <li><a href="#">Terms and Conditions</a></li>
			      <li><a href="#">Privacy Policy</a></li>
			    </ul>
			  </div>
		  </footer>
		</div>
    );
  }
});
