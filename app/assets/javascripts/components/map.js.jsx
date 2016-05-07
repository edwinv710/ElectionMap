var MapDisplay = React.createClass({

   getInitialState: function() {
      return { 
         
      };
   },


   shouldComponentUpdate(nextProps, nextState) {
      if(nextProps.results.update){election.updateMap();}
      return false;
   },

  render: function() {
    return (
      <div className="lg-map-wrapper">
         <div id="lg-map">a</div>
      </div>
    )
  }
});

