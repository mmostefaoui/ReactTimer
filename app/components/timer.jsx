var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var CountDown = React.createClass({
    getInitialState: function () {
        return {
            count: 0,
            timerStatus: 'stopped'
        };
    },
    componentWillUnmount: function () {
        clearInterval(this.timer);
        this.timer = undefined;
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.timerStatus !== prevState.timerStatus) {
            switch (this.state.timerStatus) {
                case 'started':
                    this.handleStart();
                    break;
                case 'stopped':
                    // reset
                    this.setState({count: 0});
                case 'paused':
                    clearInterval(this.timer);
                    this.time = undefined;
                    break;
            }
        }
    },
    handleStart: function () {
        this.timer = setInterval(() => {
            this.setState({
                count: this.state.count + 1
            });

        }, 1000);
    },
    handleStatusChange: function (newStatus) {
        this.setState({timerStatus: newStatus});
    },
    render: function () {
        var {count, timerStatus} = this.state;

        return (
            <div>
                <h1 className="page-title">Timer App</h1>
                <Clock totalSeconds={count}/>
                <Controls countDownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
            </div>
        );
    }
});

module.exports = CountDown;