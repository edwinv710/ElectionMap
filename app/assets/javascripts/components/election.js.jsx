var ElectionContainer = React.createClass({

   getInitialState: function() {
      
      return { 
         mapStore: electionConductor.mapStore,
         candidateStore: electionConductor.candidateStore,
         contestStore: electionConductor.contestStore,
         activeState: "NY"
      };
   },

   componentWillMount() {
        electionConductor.setUpdate(this, this.setState)  
   },

   componentDidMount() {
       electionConductor.createMap()  
   },

   updateResults: function(state, candidate, value){
       electionConductor.updateStateResult(state, candidate, value);
   },

   render: function() {
            // console.log(this.state.contestStore[this.state.activeState])

      return (

         <div className="mContainer">
            <CandidateList candidateStore={this.state.candidateStore} />
            <MapDisplay mapStore={this.state.mapStore} />
            <ContestBox contestStore={this.state.contestStore[this.state.activeState]} activeState={this.state.activeState} updateResults={this.updateResults} /> 
         </div>
      )
   }
});
