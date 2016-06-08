var ElectionMap = React.createClass({

   componentDidMount() {
       this.props.createMap();  
   },

  render: function() {
    return (
          <div className="lg-map-wrapper container">
             <div id="lg-map">a</div>
          </div>
    )
  }
});