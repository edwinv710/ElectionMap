var ContestSlider = React.createClass({
  displayName: "ContestSlider",

  setSlidersPercentage: function () {
    var max = this.props.maxDelegates;
    var currentValue = this.props.currentValue;
    $(this.props.sliderClass).find(".slider").each(function (index) {
      $(this).find(".ui-slider-handle").html(Math.round(currentValue / max.toFixed(2) * 100.0) + "%");
    });
  },

  componentDidMount: function () {
    var max = this.props.maxDelegates;
    var updateResults = this.props.updateResults;
    $(this.props.sliderClass).find(".slider").sliders({ max: max, min: 0 }, function (element, value, available) {
      var candidateId = parseInt($(element).data('candidateid'), 10);
      $(element).find(".ui-slider-handle").html(Math.round(value / max.toFixed(2) * 100.0) + "%");
      updateResults(candidateId, value);
    });
    this.setSlidersPercentage();
  },

  render: function () {
    return React.createElement(
      "div",
      { className: "slider-container", style: { display: "flex" } },
      React.createElement("div", { className: "slider", "data-value": this.props.currentValue, "data-candidateid": this.props.candidateId })
    );
  }
});
