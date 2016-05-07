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
            <span> {this.props.candidate.first_name} {this.props.candidate.last_name} - {this.props.candidate.delegate_count} </span>
         </div>
      )
  }
});
