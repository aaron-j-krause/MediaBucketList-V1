'use strict';
//run tests with npm test

/* jshint ignore:start */
var jsdom = require('mocha-jsdom');
var expect = require('chai').expect
var React = require('react/addons')
var TestUtils = React.addons.TestUtils;
var About = require('../app/js/components/about.jsx');

describe('About Page with logo', function() {
  jsdom();

  it('should render an image tag', function() {
    var about = TestUtils.renderIntoDocument(
      <About />
    );

    var image = TestUtils.findRenderedDOMComponentWithTag(
      about, 'img');
    expect(image.props.src).to.include('.png');
  });
});
