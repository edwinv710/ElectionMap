var ElectionMapControls = React.createClass({

   render: function() {
      return (

        <div className="container">
          <div className="five ui basic buttons">
            <button className="ui button active">Winning</button>
            <button className="ui button">Delegate Difference</button>
            <button className="ui button">Total Votes</button>
            <button className="ui button">Polls</button>
          </div>
        </div>
        
      )
   }
});