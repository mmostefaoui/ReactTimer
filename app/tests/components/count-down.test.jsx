var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var CountDown = require('CountDown');

describe('CountDown', () => {
    it('should exist', () => {
        expect(CountDown).toExist();
    });

    describe('handleSetCountDown', () => {
        it('should set the status to started and countDown', (done) => {
            var countDown = TestUtils.renderIntoDocument(<CountDown />);
            countDown.handleSetCountDown(10);

            expect(countDown.state.count).toBe(10);
            expect(countDown.state.countDownStatus).toBe('started');
            setTimeout(() => {
                expect(countDown.state.count).toBe(9);
                done();
            }, 1001);
        });

        it('should never set the count less than 0', (done) => {
            var countDown = TestUtils.renderIntoDocument(<CountDown />);
            countDown.handleSetCountDown(1);

            setTimeout(() => {
                expect(countDown.state.count).toBe(0);
                done();
            },3001);
        });
    });
});