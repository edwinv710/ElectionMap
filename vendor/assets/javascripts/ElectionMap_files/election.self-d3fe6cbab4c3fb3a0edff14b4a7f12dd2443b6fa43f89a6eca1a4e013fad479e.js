var Election = function(election){

   var name = election.name;
   var processType = election.processType;
   var affiliation = election.affiliation;
   var delegatesNeeded = election.delegatesNeeded;
   var candidates = [];
   var contests = [];
   
   var candidateIdToIndex = {};

   (function setCandidates(){
      candidates = election.candidates.map(function(candidate, index){
         candidateIdToIndex[candidate.id.toString()] = index;
         return Candidate(candidate, index);
      });
   })();

   (function setContest(){
      contests = election.contests.map(function(contest){
         return Contest(contest); 
      });
   })();

   var getCandidateByID = function(id){
      var returnedCandidate = null;
      candidates.some(function(candidate, index, array){
         if(candidate.id === parseInt(id)) returnedCandidate = candidate;
         return (candidate.id === parseInt(id))
      });
      return returnedCandidate;
   }

   var updateContest = function(state, candidate, value){
      console.log("State is"+state)
      contest = contests.find(function(c){
         return (c.state.symbol === state);
      });
      if(contest){
         return contest.update(candidate, value);
      }
      return [-1, 0];
   }

   return {
      contests: contests,
      candidates: candidates,
      candidateIdToIndex: candidateIdToIndex,
      updateContest: updateContest,
      delegatesNeeded: delegatesNeeded,
      totalSuperDelegates: election.totalSuperDelegates

   }
}
