var ContestSlider = React.createClass({

   setSlidersPercentage: function(){
    // console.log("candidate "+this.props.candidateId+"currentValue "+this.props.currentValue+" max "+this.props.maxDelegates)
    var candidateId = this.props.candidateId; 
    var max = this.props.maxDelegates
    var currentValue = this.props.currentValue;
    $(this.props.sliderClass).find(".candidate"+candidateId).each(function(index){
      $(this).siblings("span.slider-percentage").html(Math.round(currentValue/max.toFixed(2) * 100.0) + "%");
    });
   },

  componentDidMount() {
   var max = this.props.maxDelegates
   var updateResults = this.props.updateResults;
   $(this.props.sliderClass).find(".slider").sliders({max: max, min: 0}, function(element, value, available){
     var candidateId = parseInt($(element).data('candidateid'), 10);
     $(element).siblings("span.slider-percentage").html(Math.round(value/max.toFixed(2) * 100.0) + "%");
     updateResults(candidateId, value);
   });
   this.setSlidersPercentage();
  },

  render: function() {
    return (
      <div className="slider-container" style={{display: "flex"}}>
         <div className={"slider candidate"+this.props.candidateId} data-value={this.props.currentValue} data-candidateid={this.props.candidateId}>
         </div>
         <span className="slider-percentage"></span>
       </div>
    )
  }
});
