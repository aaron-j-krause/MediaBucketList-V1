'use strict';

var jsdom = require('mocha-jsdom');
var chai = require('chai');
var expect = chai.expect;

describe('Nav bar with links', function() {
  jsdom();

  it('should render three anchors each with onClicks', function() {
    var React = require('react/addons');
    var UserNav = require('../app/js/components/user-nav.jsx');
    var TestUtils = React.addons.TestUtils;

    var nav = TestUtils.renderIntoDocument(
      <UserNav />
    );

    var anchors = TestUtils.scryRenderedDOMComponentsWithTag(
      nav, 'a');
    expect(anchors[0].props.onClick).to.exist;
    expect(anchors[1].props.onClick).to.exist;
    expect(anchors[2].props.onClick).to.exist;
  });
});
