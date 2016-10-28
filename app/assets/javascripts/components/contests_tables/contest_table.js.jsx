var ContestTable = React.createClass({

  

  
  tableHeaders: function(){
    var tableHeaders = this.props.tableStore.contestHeaders.concat(this.props.tableStore.candidatesHeaders);
    return tableHeaders.map(function(header, i){
      return (
          <th rowspan="2" key={i}> {header} </th>
      );
    });
  },

  tableRows: function(){
    var contestHeaders = this.props.tableStore.contestHeaders;
    var candidatesHeaders = this.props.tableStore.candidatesHeaders;
    var updateResults = this.props.updateResults
    console.log(this.props.tableStore.results);
    return this.props.tableStore.results.map(function(result, i){
      return (
          <ContestTableRow key={i} contestHeaders={contestHeaders} candidatesHeaders={candidatesHeaders} result={result} updateResults={updateResults} rule={result.rule} />

      );
    });
  },


  render: function() {

    return (
          <table className="ui celled structured table">
            <thead>
              <tr>
                {this.tableHeaders()}
              </tr>
            </thead>
            <tbody>
              {this.tableRows()}
            </tbody>
          </table>
    )
  }
});