'use strict';
//run tests with npm test

/* jshint ignore:start */
var jsdom = require('mocha-jsdom');
var chai = require('chai');
var expect = chai.expect;

describe('About Page with logo', function() {
  jsdom();

  it('should render an image tag with ', function() {
    var React = require('react/addons');
    var About = require('../app/js/components/about.jsx');
    var TestUtils = React.addons.TestUtils;

    var about = TestUtils.renderIntoDocument(
      <About />
    );

    var image = TestUtils.findRenderedDOMComponentWithTag(
      about, 'img');
    expect(image.props.src).to.include('.png');
  });
});
