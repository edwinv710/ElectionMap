var Election = function(election){

   var processType = election.processType;
   var affiliation = election.affiliation;
   var delegatesNeeded = election.delegatesNeeded;
   var candidates = [];
   var contests = [];
   var userContestCode;

   var contestResults = {};
   var candidateTotals = {};
   
   var candidateIdToIndex = {};

   function setCandidateResults() {
     contests.forEach(function(contest){
      Object.keys( contest.totalsByCandidates ).forEach( function(key){
        candidateTotals[key] = ( candidateTotals[key] || 0 ) + contest.totalsByCandidates[key];
      }); 
    });
     candidates.forEach(function(candidate){
      candidate.pledgedDelegateCount = candidateTotals[candidate.id];
     });
     console.log(candidateTotals);
     console.log(candidates);
   }

   function getParameterByName(name, url) {
       if (!url) url = window.location.href;
       name = name.replace(/[\[\]]/g, "\\$&");
       var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
           results = regex.exec(url);
       if (!results) return null;
       if (!results[2]) return '';
       return decodeURIComponent(results[2].replace(/\+/g, " "));
   }

   function setCandidates(){
      console.log(election.candidates);
      candidates = election.candidates.map(function(candidate, index){
         candidateIdToIndex[candidate.id.toString()] = index;
         return Candidate(candidate, index);
      });
   }

   function setContests(){
      contests = election.contests.map(function(contest){
         return Contest(contest); 
      });
   }

   function createUserContests(){
      var param = getParameterByName("val");
      var contestIndex = contests.findIndex(function(c){ return c.isComplete === false; });
      var availableContests = contests.slice(contestIndex);
      var availableCandidates = candidates.filter(function(candidate){
         return (!candidate.lastCompetitiveDate || (candidate.lastCompetitiveDate > contests[contestIndex].date));
      });

      if(param){
         userContestCode = UserContestCode(availableContests, availableCandidates, param)
         userContestCode.contestCodes.forEach(function(codeObject, index){
          var values = codeObject.values;
            for(var i = 0; i < values.length; i++){
               availableCandidates[i].pledgedDelegateCount += values[i];
               availableContests[index].update(availableCandidates[i].id, values[i]);
            }
         });
       }else{
         userContestCode = UserContestCode(availableContests, availableCandidates)
       }
   }

   var updateCandidates = function(prevValues, currentValues){
      candidates.forEach(function(c){
         var currentValue = currentValues[c.id.toString()];
         var prevValue = prevValues[c.id.toString()];         
         if(currentValue != undefined){
            var difference = currentValue - (prevValue || 0);
            c.pledgedDelegateCount =  c.pledgedDelegateCount + difference;
         }
      });
   }

   var getDelegateCountMap = function(contest){
      var delegateMap = {};
      contest.results.forEach(function(r){
         if(r.delegateType === "user") delegateMap[r.candidateId.toString()] = (delegateMap[r.candidateId.toString()] || 0) + r.delegateCount;
      });
      return delegateMap;
   }

   var update = function(state, candidate, value){
      var contest = contests.find(function(c){
         return (c.state.symbol === state);
      });

      if(contest){
         var rule = contest.rule;
         var previousValues = getDelegateCountMap(contest);
         contest.update(candidate, value);
         var currentValues = getDelegateCountMap(contest);
         updateCandidates(previousValues, currentValues);
         userContestCode.update(contest, candidate, value)
      }
   }

   
   setContests();

   setCandidates();
   createUserContests();
   setCandidateResults();

   return {
      name: election.name,
      contests: contests,
      candidates: candidates,
      candidateIdToIndex: candidateIdToIndex,
      update: update,
      delegatesNeeded: delegatesNeeded,
      totalSuperDelegates: election.totalSuperDelegates

   }
}