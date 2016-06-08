var ContestSelector = React.createClass({

  setWinner: function(){
    var turnOn = !this.props.turnOn;
    console.log("Is this being turned on? "+turnOn)
    this.props.setWinner(turnOn);
  },


  render: function() {
    var input = this.props.turnOn ? (<input type="checkbox" checked onChange={this.setWinner}/>) : (<input type="checkbox" onChange={this.setWinner}/>);
    return (
      <div>
        <div className="ui fitted toggle checkbox">
          {input}
          <label className={"candidate"+this.props.candidateId}></label>
        </div>
      </div>
    );
  }
});