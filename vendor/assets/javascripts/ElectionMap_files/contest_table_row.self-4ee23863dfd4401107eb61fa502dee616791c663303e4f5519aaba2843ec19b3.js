var ContestTableRow = React.createClass({
  displayName: "ContestTableRow",

  updateResults: function (candidate, value) {
    this.props.updateResults(this.props.result.symbol, candidate, value);
  },

  tableRow: function () {
    return this.contestRowContent().concat(this.candidateRowContent());
  },

  contestRowContent: function () {
    contestInformation = this.props.result.contestInformation;
    return this.props.contestHeaders.map(function (header) {
      var value = contestInformation[header].value;
      var display = header === "Date" ? moment(value).format("LL") : value;
      return React.createElement(
        "td",
        { className: "left aligned" },
        display
      );
    });
  },

  sliderColumn: function (header) {
    return React.createElement(
      "td",
      { className: "center aligned", style: this.props.result.candidatesResults[header].style },
      React.createElement(ContestSlider, { candidateId: this.props.result.candidatesResults[header].id, currentValue: this.props.result.candidatesResults[header].value, maxDelegates: this.props.result.contestInformation["Delegates"].value, sliderClass: ("." + this.props.result.symbol + "-row").replace(/ /g, ''), updateResults: this.updateResults }),
      React.createElement(
        "div",
        { className: "amount" },
        this.props.result.candidatesResults[header].value
      )
    );
  },

  valueColumn: function (header) {
    return React.createElement(
      "td",
      { className: "center aligned", style: this.props.result.candidatesResults[header].style },
      this.props.result.candidatesResults[header].value
    );
  },

  blankColumn: function (header) {
    return React.createElement(
      "td",
      { className: "center aligned", style: { opacity: 0.3 } },
      "-"
    );
  },

  candidateRowContent: function () {
    var isComplete = this.props.result.isComplete;
    var valueColumn = this.valueColumn;
    var sliderColumn = this.sliderColumn;
    var blankColumn = this.blankColumn;
    var candidatesResults = this.props.result.candidatesResults;
    return this.props.candidatesHeaders.map(function (header) {
      if (!candidatesResults[header]) return blankColumn();
      return isComplete ? valueColumn(header) : sliderColumn(header);
    });
  },

  render: function () {

    var className = (this.props.result.symbol + "-row").replace(/ /g, '');

    return React.createElement(
      "tr",
      { className: className },
      this.tableRow()
    );
  }
});
