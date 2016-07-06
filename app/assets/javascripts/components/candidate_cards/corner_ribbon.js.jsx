var CornerRibbon = React.createClass({

   getStyles: function(){
      return {
         background: this.props.color,
         fontWeight: 900,
         fontSize: "11px",
         top: this.props.multiline ? "27.5px" : "20px"
      }
   },

  render: function() {
    return (
      <div className="corner-ribbon top-left shadow" style={this.getStyles()}>
         {this.props.message}
      </div> 
   )
  }
});
