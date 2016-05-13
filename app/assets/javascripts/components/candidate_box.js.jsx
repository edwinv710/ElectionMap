var CandidateBox = React.createClass({

 
  render: function() {
   var candidateBoxStyle = {
      marginBottom: "20px"
   };
   var colorKeyStyle = {
     backgroundColor: this.props.candidate.color,
     width: "20px",
     height: "20px",
     display: "inline-block",
     marginRight: "5px"
   };
   return (
         <div class="candidate-box" data-id={this.props.candidateID}>
            <div class="color-key" style={colorKeyStyle}>&nbsp;</div> 
            <span> {this.props.candidate.firstName} {this.props.candidate.lastName} - {this.props.candidate.delegateCount} </span>
         </div>
      )
  }
});
