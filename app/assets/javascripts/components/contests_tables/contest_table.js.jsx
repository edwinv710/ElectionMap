var ContestTable = React.createClass({

  

  
  tableHeaders: function(){
    var tableHeaders = this.props.tableStore.contestHeaders.concat(this.props.tableStore.candidatesHeaders);
    return tableHeaders.map(function(header){
      return (
          <th rowspan="2"> {header} </th>
      );
    });
  },

  tableRows: function(){
    var contestHeaders = this.props.tableStore.contestHeaders;
    var candidatesHeaders = this.props.tableStore.candidatesHeaders;
    var updateResults = this.props.updateResults

    return this.props.tableStore.results.map(function(result){
      return (
          <ContestTableRow contestHeaders={contestHeaders} candidatesHeaders={candidatesHeaders} result={result} updateResults={updateResults} rule={result.rule} />

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