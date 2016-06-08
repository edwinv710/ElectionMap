var ProgressBar = React.createClass({
  displayName: "ProgressBar",

  render: function () {
    var percent = Math.floor(this.props.value / this.props.max.toFixed(2) * 100) + "%";
    var color = this.props.color;
    return React.createElement(
      "div",
      { className: "progressbar" },
      React.createElement(
        "div",
        { className: "background" },
        " ",
        React.createElement(
          "span",
          null,
          this.props.value,
          "  / ",
          this.props.max,
          " - ",
          percent
        )
      ),
      React.createElement(
        "div",
        { className: "remaining", style: { backgroundColor: color, width: percent } },
        " ",
        React.createElement(
          "span",
          null,
          this.props.value,
          "  / ",
          this.props.max,
          " - ",
          percent
        )
      )
    );
  }
});
