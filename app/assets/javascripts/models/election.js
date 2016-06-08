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

   var update = function(state, candidate, value){
      var contest = contests.find(function(c){
         return (c.state.symbol === state);
      });
      if(contest){
         var rule = contest.rule;
         var previousValues =  {};
         var currentValues = {};
         contest.results.forEach(function(r){
            console.log("Before type: "+r.delegateType);
            if(r.delegateType === "user"){
               previousValues[r.candidateId.toString()] = (previousValues[r.candidateId.toString()] || 0) + r.delegateCount;
            }
         });
         var updatedContestResults = contest.update(candidate, value);
         contest.results.forEach(function(r){
            console.log("After type: "+r.delegateType);
            if(r.delegateType === "user"){
               currentValues[r.candidateId.toString()] = (currentValues[r.candidateId.toString()] || 0) + r.delegateCount;
            }
         });

         
         updateCandidates(previousValues, currentValues);
         return updatedContestResults;
      }
      return [-1, 0];
   }

   var updateCandidates = function(prevValues, currentValues){
      candidates.forEach(function(c){
         var currentValue = currentValues[c.id.toString()];
         var prevValue = prevValues[c.id.toString()];
         console.log(c.id+" had "+prevValue+" but now has "+currentValue);
         
         if(currentValue != undefined){
            var difference = currentValue - (prevValue || 0);
            console.log("The difference is "+difference)
            c.pledgedDelegateCount =  c.pledgedDelegateCount + difference;
         }
      });
   }

   return {
      contests: contests,
      candidates: candidates,
      candidateIdToIndex: candidateIdToIndex,
      update: update,
      delegatesNeeded: delegatesNeeded,
      totalSuperDelegates: election.totalSuperDelegates

   }
}