'use strict';
//run tests with npm test

/* jshint ignore:start */
var jsdom = require('mocha-jsdom');
var expect = require('chai').expect
var React = require('react/addons')
var TestUtils = React.addons.TestUtils;
var MovieSearch = require('../app/js/components/movie-search.jsx');

describe('Movie Search', function() {
  jsdom();

  it('should render a form', function() {
    var testSearchData  = ['test', 'test', 'test'];

    var movieSearch = TestUtils.renderIntoDocument(
      <MovieSearch  searchData={testSearchData}/>
    );

    var form = TestUtils.findRenderedDOMComponentWithTag(
      movieSearch, 'form'
    );

    expect(form).to.exist;

  })

  it('should only render make list butto with search data', function() {
    var testSearchData = [];

    var movieSearch = TestUtils.renderIntoDocument(
      <MovieSearch searchData={testSearchData} />
    );

    var inputs = TestUtils.scryRenderedDOMComponentsWithTag(
      movieSearch, 'input'
    );

    var includesButton = inputs.every(function(input) {
      return input.props.type === 'button';
    })

    expect(includesButton).to.eql(false);
  })

  it('should change placeholder on radio click', function() {
    var testSearchData = [];

    var movieSearch = TestUtils.renderIntoDocument(
      <MovieSearch searchData={testSearchData} />
    );
    var inputs = TestUtils.scryRenderedDOMComponentsWithTag(
      movieSearch, 'input'
    );

    var radios = inputs.filter(function(input) {
      return input.props.type === 'radio';
    });

    var textField = TestUtils.findRenderedDOMComponentWithClass(
      movieSearch, 'searchbox'
    );

    var radioTV = React.findDOMNode(radios[1]);
    expect(textField.props.placeholder).to.include('Movie');
    TestUtils.Simulate.change(radios[1]);

    expect(textField.props.placeholder).to.include('TV Show');
  })
});
