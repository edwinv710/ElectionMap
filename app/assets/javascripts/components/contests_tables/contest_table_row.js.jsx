var ContestTableRow = React.createClass({

  updateResults: function(candidate, value){
    this.props.updateResults(this.props.result.symbol, candidate, value);
  },


   tableRow: function(){
      return this.contestRowContent().concat(this.candidateRowContent());
   },

   contestRowContent: function(){
    contestInformation = this.props.result.contestInformation
    return this.props.contestHeaders.map(function(header){
      var value = contestInformation[header].value;
      var display = header === "Date" ? moment(value).format("LL") : value;
      return (
        <td className="left aligned">{display}</td>
      )
    });
   },

   setSelectorWinner: function(header){

      var symbol = this.props.result.symbol;
      var candidateId = this.props.result.candidatesResults[header].id;
      var delegateCount = this.props.result.contestInformation["Delegates"].value;
      var updateResults = this.props.updateResults;

      return function(turnOn){
        if (!turnOn) return updateResults(symbol, candidateId, 0);
        updateResults(symbol, candidateId, delegateCount);  
      }
   },


   sliderColumn: function(header){
     return (

        <td className="center aligned" style={this.props.result.candidatesResults[header].style}>
          <ContestSlider candidateId={this.props.result.candidatesResults[header].id} currentValue={this.props.result.candidatesResults[header].value} maxDelegates={this.props.result.contestInformation["Delegates"].value} sliderClass={("."+this.props.result.symbol+"-row").replace(/ /g,'')} updateResults={this.updateResults} />
          <div className="amount">
           {this.props.result.candidatesResults[header].value}
         </div>
        </td>
      );
   },

   selectorColumn: function(header){

     return (
        <td className="center aligned" style={this.props.result.candidatesResults[header].style}>
          <ContestSelector setWinner={this.setSelectorWinner(header)} candidateId={this.props.result.candidatesResults[header].id} turnOn={(this.props.result.candidatesResults[header].value > 0)}/>
          <div className="amount">
           {this.props.result.candidatesResults[header].value}
         </div>
        </td>
      );
   },

   valueColumn: function(header){
        return (
      <td className="center aligned" style={this.props.result.candidatesResults[header].style}>
        {this.props.result.candidatesResults[header].value}
      </td>
    );
   },
   
   blankColumn: function(header){
    return (
      <td className="center aligned" style={{opacity: 0.3, color: "red"}}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </td>
    );
   },

   inputColumn: function(header){
    return this.props.rule === "proportional" ? this.sliderColumn(header) : this.selectorColumn(header);
   },

   candidateRowContent: function(){
    var isComplete = this.props.result.isComplete;
    var valueColumn = this.valueColumn;
    var sliderColumn = this.sliderColumn;
    var blankColumn = this.blankColumn;
    var inputColumn = this.inputColumn;
    var candidatesResults = this.props.result.candidatesResults
    return this.props.candidatesHeaders.map(function(header){
      if(!candidatesResults[header]) return blankColumn();
      return isComplete ? valueColumn(header) : inputColumn(header); 
    });
   },

  render: function() {

    var className = (this.props.result.symbol+"-row").replace(/ /g,'');
    
    return (
      <tr className={className}>
          {this.tableRow()}
      </tr>
    )
  }
});