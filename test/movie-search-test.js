'use strict';

var React = require('react/addons');
var expect = require('chai').expect; //jshint ignore:line
var MovieSearch = require('../app/js/test-components/movie-search');
var TestUtils = React.addons.TestUtils;
var MovieSearchFactory = React.createFactory(MovieSearch)();

describe('Movie-search component', function(){
  var inputRadioMovie;
  var renderedComponent;

  before('render and locate element', function() {
    var component = MovieSearchFactory;

    renderedComponent = TestUtils.renderIntoDocument(MovieSearchFactory, document.body);

    var radio = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'input');

    inputRadioMovie = radio[1];
  });

  it('Movie radio should be checked by default', function() {
    expect(inputRadioMovie.props.checked).to.eql('true');
  });

  it('should have a formType state of Movie', function() {
    expect(renderedComponent.state.formType).to.eql('Movie');
  });
});
