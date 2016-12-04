var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var CountDownForm = require('CountDownForm');

describe('CountDownForm', () => {
    it('should exist', () => {
        expect(CountDownForm).toExist();
    });

    it('should call onSetCountDown if valid seconds entered', () => {
        var spy = expect.createSpy();
        var countDownForm = TestUtils.renderIntoDocument(<CountDownForm onSetCountDown={spy} />);
        var $el = $(ReactDOM.findDOMNode(countDownForm));

        countDownForm.refs.seconds.value = '109';
        TestUtils.Simulate.submit($el.find('form')[0])

        expect(spy).toHaveBeenCalledWith(109);
    });

    it('should not call onSetCountDown if not valid seconds entered', () => {
        var spy = expect.createSpy();
        var countDownForm = TestUtils.renderIntoDocument(<CountDownForm onSetCountDown={spy} />);
        var $el = $(ReactDOM.findDOMNode(countDownForm));

        countDownForm.refs.seconds.value = 'abc109';
        TestUtils.Simulate.submit($el.find('form')[0])

        expect(spy).toNotHaveBeenCalled();
    });
});