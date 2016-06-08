var ElectionMapSection = React.createClass({
  displayName: "ElectionMapSection",

  render: function () {
    return React.createElement(
      "div",
      { className: "row add-padding-top" },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(ElectionMap, { createMap: this.props.createMap })
      )
    );
  }
});
