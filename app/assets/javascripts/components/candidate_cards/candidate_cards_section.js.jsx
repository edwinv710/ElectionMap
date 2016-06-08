var CandidateCardsSection = React.createClass({

         render: function() {
            var delegatesNeeded = this.props.delegatesNeeded;
            var totalSuperDelegates = this.props.totalSuperDelegates
            var candidateCards = this.props.candidateStore.map(function(candidate){
               return ( <CandidateCard candidate={candidate} candidateID={candidate.id} key={candidate.id} totalSuperDelegates={totalSuperDelegates} delegatesNeeded={delegatesNeeded} />)
            })
            
            return ( 
               <div className="row off-color add-padding-top">
                  <div className="container">
                     <div id="candidates-box" className="card-container"> 
                        { candidateCards }
                     </div>
                  </div>   
               </div>
            )
         }
});
