var React = require('react');
var Navigation = require('Navigation');

var Main = (props) => {
    return (
        <div>
            <div>
                <Navigation/>
                <h1>Main.jsx rendered</h1>
                {props.children}
            </div>
        </div>
    )
};

module.exports = Main;