var ContestBox = React.createClass({

   getInitialState: function() {

      return { 
         title: "General Election",
         abbreviation: null,
         description: "Lorem Ipsum"
      };
   },

   componentWillMount() {
     GLOB.setContestBox = (title, abbreviation) => {
       this.setState({title: title, abbreviation: abbreviation});     
     };    
   },

   updateResults: function(key){
    var that = this;
    return function(e){
      var value = parseInt(e.target.value) || 0;
      that.props.updateResults(that.state.abbreviation, key, value);
    }
   },

   candidateNodes: function(){
    if (!this.state.abbreviation) return [];
    var that = this;
    return election.candidateArray().map(function(c){
      var key = c.id;
      var delegate_count = election.results[that.state.abbreviation][key];
      
      return (
        <div className="candidate-slider" key={c.id}>
           <span> {c.first_name} {c.last_name} </span>
           <input type="text" name="dcount" onChange={that.updateResults(key)} value={delegate_count}/>
        </div> 
      );
    })
   },


  render: function() {

    return (
      <div className="contest-box">
         <h4> {this.state.title} </h4>
         <p> {this.state.description} </p>

         {this.candidateNodes()}

      </div>
    )
  }
});
