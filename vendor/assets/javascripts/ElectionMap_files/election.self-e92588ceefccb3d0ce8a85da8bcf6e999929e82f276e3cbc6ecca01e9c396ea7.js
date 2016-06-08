var ElectionContainer = React.createClass({
   displayName: "ElectionContainer",

   getInitialState: function () {

      return {
         mapStore: electionConductor.mapStore,
         candidateStore: electionConductor.candidateStore,
         contestStore: electionConductor.contestStore,
         activeState: "NY",
         tableStore: electionConductor.tableStore
      };
   },

   componentWillMount: function () {
      electionConductor.setUpdate(this, this.setState);
   },

   createMap: function (callback) {
      electionConductor.createMap();
   },

   updateResults: function (state, candidate, value) {
      electionConductor.updateStateResult(state, candidate, value);
   },

   render: function () {

      return React.createElement(
         "div",
         { className: "mContainer" },
         React.createElement(CandidateCardsSection, { candidateStore: this.state.candidateStore, delegatesNeeded: electionConductor.delegatesNeeded, totalSuperDelegates: electionConductor.totalSuperDelegates }),
         React.createElement(ElectionMapSection, { mapStore: this.state.mapStore, createMap: this.createMap }),
         React.createElement(ContestTableSection, { tableStore: this.state.tableStore, updateResults: this.updateResults })
      );
   }
});
