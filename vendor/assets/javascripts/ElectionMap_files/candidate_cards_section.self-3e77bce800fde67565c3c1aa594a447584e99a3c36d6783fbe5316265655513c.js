var CandidateCardsSection = React.createClass({
   displayName: "CandidateCardsSection",

   render: function () {
      var delegatesNeeded = this.props.delegatesNeeded;
      var totalSuperDelegates = this.props.totalSuperDelegates;
      var candidateCards = this.props.candidateStore.map(function (candidate) {
         return React.createElement(CandidateCard, { candidate: candidate, candidateID: candidate.id, key: candidate.id, totalSuperDelegates: totalSuperDelegates, delegatesNeeded: delegatesNeeded });
      });

      return React.createElement(
         "div",
         { className: "row off-color add-padding-top" },
         React.createElement(
            "div",
            { className: "container" },
            React.createElement(
               "div",
               { id: "candidates-box", className: "card-container" },
               candidateCards,
               " "
            ),
            ");"
         )
      );
   }
});
