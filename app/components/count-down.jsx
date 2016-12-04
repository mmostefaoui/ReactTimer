var React = require('react');
var Clock = require('Clock');
var CountDownForm = require('CountDownForm');
var Controls = require('Controls');

var CountDown = React.createClass({
    getInitialState: function () {
        return {
            count: 0,
            countDownStatus: 'stopped'
        };
    },
    componentWillUnmount: function () {
        console.log('componentWillUnmount')
        clearInterval(this.timer);
        this.timer = undefined;
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.countDownStatus !== prevState.countDownStatus) {
            switch (this.state.countDownStatus) {
                case 'started':
                    this.startTimer();
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
    startTimer: function () {
        this.timer = setInterval(() => {
            var newCount = this.state.count - 1;
            this.setState({
                count: newCount >= 0 ? newCount : 0
            });

            if (newCount === 0) {
                this.setState({countDownStatus: 'stopped'});
            }
        }, 1000);
    },
    handleSetCountDown: function (seconds) {
        this.setState({
            count: seconds,
            countDownStatus: 'started'
        })
    },
    handleStatusChange: function (newStatus) {
        this.setState({countDownStatus: newStatus});
    },
    render: function () {
        var {count, countDownStatus} = this.state;

        let renderControlArea = () => {
            if (countDownStatus !== 'stopped') {
                return <Controls countDownStatus={countDownStatus} onStatusChange={this.handleStatusChange}/>
            } else {
                return <CountDownForm onSetCountDown={this.handleSetCountDown}/>;
            }
        };

        return (
            <div>
                <h1 className="page-title">Countdown App</h1>
                <Clock totalSeconds={count}/>
                {renderControlArea()}
            </div>
        );
    }
});

module.exports = CountDown;