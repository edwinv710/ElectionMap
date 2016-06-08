var ElectionMap = React.createClass({
  displayName: "ElectionMap",

  componentDidMount: function () {
    this.props.createMap();
  },

  render: function () {
    return React.createElement(
      "div",
      { className: "lg-map-wrapper container" },
      React.createElement(
        "div",
        { id: "lg-map" },
        "a"
      )
    );
  }
});
