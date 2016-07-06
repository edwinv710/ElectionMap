var ElectionMapSection = React.createClass({

  render: function() {
    return (

      <div className="row add-padding-top">
        <div className="container">  
          <Controls />
          <ElectionMap createMap={this.props.createMap} />
        </div>

      </div>
    )
  }
});