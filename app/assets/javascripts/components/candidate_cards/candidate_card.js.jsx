var CandidateCard = React.createClass({

  render: function() {
   return (
    <div className="card" style={this.props.candidate.style}>
      <div className="card-header">
        <div className="banner">
          <img src={this.props.candidate.bannerUrl} />
        </div>
        <div className="portrait">
          <img src={this.props.candidate.imageUrl}/>
        </div>
        <section className="info">
          <h4>{this.props.candidate.firstName} {this.props.candidate.lastName}</h4>
          <header> {this.props.candidate.description}</header>
          <i className="fa fa-globe" aria-hidden="true"> </i>
          <a href={"https://"+this.props.candidate.websiteUrl}>{this.props.candidate.websiteUrl}</a>
        </section>
      </div>
      <div className="info card-body">
        <section className="delegates" >
          <header>Delegates Needed</header>
          <ProgressBar value={this.props.candidate.pledgedDelegateCount} max={this.props.delegatesNeeded} color={this.props.candidate.rgba(1).toString()} />          
        </section>
        <section className="delegates">
          <div className="group">
            <header> Total Pledged Delegates</header>
            <ProgressBar value={this.props.candidate.pledgedDelegateCount} max={((this.props.delegatesNeeded - 1) * 2) - this.props.totalSuperDelegates} color={this.props.candidate.color} />
          </div>
          <div className="group">
            <header>Super Delegates</header>
            <ProgressBar value={this.props.candidate.superDelegateCount} max={this.props.totalSuperDelegates} color={this.props.candidate.rgba(1).toString()} />
          </div>
        </section>
      </div>
    </div>
   )
  }
});
