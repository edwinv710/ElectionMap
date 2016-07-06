var Controls = React.createClass({

  render: function() {
    return (
      <div className="controls" style={{marginBottom: "30px"}}>
        <div className="ui pointing menu">
          <a className="item" style={{fontSize: "1.3em"}}>
            Winner
          </a>
          <a className="item active" style={{fontSize: "1.3em"}}>
            Total Delegates
          </a>
          <a className="item" style={{fontSize: "1.3em"}}>
            Delegates Differentials
          </a>
        </div>
      </div> 
   )
  }
});
