var ElectionContainer = React.createClass({

   getInitialState: function() {
      
      return { 
         name: election.name, 
         processType: election.processType, 
         affilitation: election.affilitation,
         candidates: election.candidates,
         results: election.results
      };
   },

   componentWillMount() {
       election.setUpdate(this, this.setState)  
   },

   componentDidMount() {
       election.createMap()  
   },

   updateResults: function(state, candidate, value){

      election.setStateResult(state, candidate, value);
   },

   render: function() {
      return (

         <div className="mContainer">
            <h2> {this.state.name} </h2>
            <CandidateList candidates={this.state.candidates} />
            <MapDisplay results={this.state.results} />
            <ContestBox candidates={this.state.candidates} results={this.state.results} updateResults={this.updateResults} />
         </div>
      )
   }
});
