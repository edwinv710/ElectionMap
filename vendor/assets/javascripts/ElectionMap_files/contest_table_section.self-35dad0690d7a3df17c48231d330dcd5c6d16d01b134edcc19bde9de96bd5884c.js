var ContestTableSection = React.createClass({
  displayName: "ContestTableSection",

  render: function () {
    console.log("Updating Table");
    return React.createElement(
      "div",
      { className: "row off-color" },
      React.createElement(
        "div",
        { className: "container add-padding-top" },
        React.createElement(ContestTable, { tableStore: this.props.tableStore, updateResults: this.props.updateResults })
      )
    );
  }
});
