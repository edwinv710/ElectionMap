var ProgressBar = React.createClass({


  render: function() {
    var percent = (Math.floor((this.props.value / this.props.max.toFixed(2))*100));
    var leftPercent = percent > 100 ? 0 : 100 - percent;
    var color = this.props.color;
    return (
      <div className="progressbar">
        <div className="background"> <span>{this.props.value}  / {this.props.max} - {percent+"%"}</span>
        </div>
        <div className="remaining" style={{backgroundColor: color, right: leftPercent+"%"}}>
        </div>
      </div>
    )
  }
});