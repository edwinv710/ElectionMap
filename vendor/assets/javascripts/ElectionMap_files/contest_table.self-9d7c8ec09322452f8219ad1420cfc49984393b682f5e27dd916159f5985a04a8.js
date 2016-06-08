var ContestTable = React.createClass({
  displayName: "ContestTable",

  componentDidMount: function () {},

  tableHeaders: function () {
    var tableHeaders = this.props.tableStore.contestHeaders.concat(this.props.tableStore.candidatesHeaders);
    return tableHeaders.map(function (header) {
      return React.createElement(
        "th",
        { rowspan: "2" },
        " ",
        header,
        " "
      );
    });
  },

  tableRows: function () {
    var contestHeaders = this.props.tableStore.contestHeaders;
    var candidatesHeaders = this.props.tableStore.candidatesHeaders;
    var updateResults = this.props.updateResults;
    return this.props.tableStore.results.map(function (result) {
      return React.createElement(ContestTableRow, { contestHeaders: contestHeaders, candidatesHeaders: candidatesHeaders, result: result, updateResults: updateResults });
    });
  },

  // candidateNameHeaders: function(){
  //   return this.props.candidateStore.map(function(candidate){
  //     return (
  //       <th>
  //         {candidate.firstName} {candidate.lastName}
  //       </th>
  //     );
  //   });
  // },

  render: function () {

    //   var that = this;

    //   var canidateResults = function(contest){
    //     var results = contest.results;
    //     // console.log(JSON.stringify(this.props.candidateStore))
    //     return that.props.candidateStore.map(function(candidate){
    //       var style = {};
    //       var rgba = candidate.rgba(0.85);
    //       var color = "rgba("+rgba.r+", "+rgba.g+","+rgba.b+","+rgba.a+")";

    //       if(contest.winner > 0){
    //         if(contest.winner === candidate.id){
    //           style = {backgroundColor: color}
    //         }
    //         return (
    //           <td className="left aligned" style={style}>
    //             {results[candidate.id.toString()].delegateCount}
    //           </td>
    //         );
    //       } else{
    //         return(
    //           <td className="center aligned ">
    //               <div className="slider-container" style={{display: "flex"}}>
    //                 <div className="amount amount3">
    //                   {results[candidate.id.toString()].delegateCount}
    //                 </div>
    //                 <div className="vtSlider3 slider">
    //                 </div>
    //               </div>
    //             </td>
    //         );
    //       }      
    //     });
    //   }

    //   var contestsInfo = Object.keys(this.props.contestStore).map(function(key){
    //     return (
    //       <ContestTableRow candidateStore={that.props.candidateStore} contest={that.props.contestStore[key]} />
    //     );
    //   });

    return React.createElement(
      "table",
      { className: "ui celled structured table" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          this.tableHeaders()
        )
      ),
      React.createElement(
        "tbody",
        null,
        this.tableRows()
      )
    );
  }
});
