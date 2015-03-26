'use strict';

var React = require('react/addons');
var expect = require('chai').expect;
var HomeView = require('../app/js/test-components/home-view');
var TestUtils = React.addons.TestUtils;
var HomeViewFactory = React.createFactory(HomeView)();

describe('Todo-item component', function(){
  var anchors;
  var renderedComponent;

  before('render and locate element', function() {
    // Create our component
    var component = HomeViewFactory

    renderedComponent = TestUtils.renderIntoDocument(HomeViewFactory, document.body);

    anchors = TestUtils.scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'a'
    );
    // this.inputElement = inputComponents[0].getDOMNode()
    // console.log(inputComponents[0].props.name)
    // this.inputElementTwo = inputComponents[1].getDOMNode();
    // console.log(renderedComponent.state);

  });

  after(function(){
    this.inputElement = null;
  })

  it('first anchor should have a name home', function() {
    expect(anchors[0].props.name).to.eql('home');
  });
  it('second anchor should have a name about', function() {
    expect(anchors[1].props.name).to.eql('about')
  });
  it('should have a default view state of home', function() {
    expect(renderedComponent.state.view).to.eql('home');
  })

})