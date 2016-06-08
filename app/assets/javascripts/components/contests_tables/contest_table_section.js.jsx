var ContestTableSection = React.createClass({

  render: function() {
    return (
      <div className="row off-color">
        <div className="container add-padding-top"> 

          <ContestTable tableStore={this.props.tableStore} updateResults={this.props.updateResults} />
        </div> 
      </div>
    )
  }
});
