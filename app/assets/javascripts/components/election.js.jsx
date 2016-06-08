var ElectionContainer = React.createClass({

   getInitialState: function() {
      
      return { 
         mapStore: electionConductor.mapStore,
         candidateStore: electionConductor.candidateStore,
         activeState: "NY",
         tableStore: electionConductor.tableStore
      };
   },

   componentWillMount() {
        electionConductor.setUpdate(this, this.setState)  
   },

   createMap: function(callback){
    electionConductor.createMap();
   },

   updateResults: function(state, candidate, value){
       electionConductor.updateStateResult(state, candidate, value);
   },

   render: function() {

      return (

         <div className="mContainer">
            <CandidateCardsSection candidateStore={this.state.candidateStore} delegatesNeeded={electionConductor.delegatesNeeded} totalSuperDelegates={electionConductor.totalSuperDelegates}/>
            <ElectionMapSection mapStore={this.state.mapStore} createMap={this.createMap}/>
            <ContestTableSection tableStore={this.state.tableStore} updateResults={this.updateResults} />
         </div>
      )
   }
});
