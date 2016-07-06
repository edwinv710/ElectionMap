var ElectionMap = React.createClass({

   componentDidMount() {
       this.props.createMap();  
   },

  render: function() {
    return (
          <div className="map-background" style={{backgroundColor: "rgba(200, 221, 255, 0.15)", padding: "4.5%",  border: "0px solid rgba(34,36,38,.15)"}}>
            <div className="lg-map-wrapper ">
              <div id="lg-map">a</div>
            </div>
          </div>
    )
  }
});