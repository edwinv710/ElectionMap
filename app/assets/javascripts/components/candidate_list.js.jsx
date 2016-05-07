var CandidateList = React.createClass({

         render: function() {
            var candidateBox = election.candidatesSortedByDelegates().map(function(candidate){
               return ( <CandidateBox candidate={candidate} candidateID={candidate.id} key={candidate.id} />)
            })
            
            return ( <div id="candidates-box"> { candidateBox } </div>);
         }
});
