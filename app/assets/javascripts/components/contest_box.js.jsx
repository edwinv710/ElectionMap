var ContestBox = React.createClass({

   getInitialState: function() {

      return { 
         title: "General Election",
         abbreviation: null,
         description: "Lorem Ipsum"
      };
   },


   updateResults: function(key){
    var that = this;
    return function(e){
      var value = parseInt(e.target.value) || 0;
      that.props.updateResults(that.props.contestStore.abbreviation, key, value);
    }
   },

   candidateNodes: function(){
    if (!this.props.contestStore) return [];
    var that = this;
    return Object.keys(this.props.contestStore.results).map(function(key){
      var delegateCount = that.props.contestStore.results[key].delegateCount;
      var firstName = that.props.contestStore.results[key].firstName;
      var lastName = that.props.contestStore.results[key].lastName;
      
      return (
        <div className="candidate-slider" key={key}>
           <span> {firstName} {lastName} </span>
           <input type="text" name="dcount" onChange={that.updateResults(key)} value={delegateCount}/>
        </div> 
      );
    })
   },



  render: function() {
    var title = this.props.contestStore.name || "General";
    return (
      <div className="contest-box">
         <h4> {title} </h4>
         <p> {this.state.description} </p>

         {this.candidateNodes()}

      </div>
    )
  }
});
