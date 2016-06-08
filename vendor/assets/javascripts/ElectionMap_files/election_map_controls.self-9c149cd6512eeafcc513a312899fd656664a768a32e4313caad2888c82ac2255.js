var ElectionMapControls = React.createClass({
  displayName: "ElectionMapControls",

  render: function () {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "five ui basic buttons" },
        React.createElement(
          "button",
          { className: "ui button active" },
          "Winning"
        ),
        React.createElement(
          "button",
          { className: "ui button" },
          "Delegate Difference"
        ),
        React.createElement(
          "button",
          { className: "ui button" },
          "Total Votes"
        ),
        React.createElement(
          "button",
          { className: "ui button" },
          "Polls"
        )
      )
    );
  }
});
