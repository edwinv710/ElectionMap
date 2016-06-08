var CandidateCard = React.createClass({
  displayName: "CandidateCard",

  render: function () {
    var opacity = this.props.candidate.status == "active" ? 1 : 0.5;
    var cardStyles = { opacity: opacity };
    return React.createElement(
      "div",
      { className: "card", style: cardStyles },
      React.createElement(
        "div",
        { className: "banner" },
        React.createElement("img", { src: this.props.candidate.bannerUrl })
      ),
      React.createElement(
        "div",
        { className: "portrait" },
        React.createElement("img", { src: this.props.candidate.imageUrl })
      ),
      React.createElement(
        "div",
        { className: "info" },
        React.createElement(
          "section",
          null,
          React.createElement(
            "h4",
            null,
            this.props.candidate.firstName,
            " ",
            this.props.candidate.lastName
          ),
          React.createElement(
            "header",
            null,
            " ",
            this.props.candidate.description
          ),
          React.createElement(
            "i",
            { className: "fa fa-globe", "aria-hidden": "true" },
            " "
          ),
          React.createElement(
            "a",
            { href: "https://" + this.props.candidate.websiteUrl },
            this.props.candidate.websiteUrl
          )
        ),
        React.createElement(
          "section",
          { className: "delegates" },
          React.createElement(
            "header",
            null,
            " Total Pledged Delegates"
          ),
          React.createElement(ProgressBar, { value: this.props.candidate.pledgedDelegateCount, max: (this.props.delegatesNeeded - 1) * 2 - this.props.totalSuperDelegates, color: this.props.candidate.color })
        ),
        React.createElement(
          "section",
          { className: "delegates" },
          React.createElement(
            "div",
            { className: "group" },
            React.createElement(
              "header",
              null,
              "Delegates Needed"
            ),
            React.createElement(ProgressBar, { value: this.props.candidate.pledgedDelegateCount, max: this.props.delegatesNeeded, color: this.props.candidate.rgba(1).toString() })
          ),
          React.createElement(
            "div",
            { className: "group" },
            React.createElement(
              "header",
              null,
              "Super Delegates"
            ),
            React.createElement(ProgressBar, { value: this.props.candidate.superDelegateCount, max: this.props.totalSuperDelegates, color: this.props.candidate.rgba(1).toString() })
          )
        )
      )
    );
  }
});
