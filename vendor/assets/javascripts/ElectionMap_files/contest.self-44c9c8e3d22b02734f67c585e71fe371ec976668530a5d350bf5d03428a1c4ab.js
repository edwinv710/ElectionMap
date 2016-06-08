var Contest = function(contest){
   var state = contest.state;
   var date = contest.date;
   var contestType = contest.contestType;
   var numberDelegates = contest.numberDelegates;
   var results = [];
   var winner = -1;
   var stateLabel = state.symbol;
   var totalsByCandidates = {};
   var userIndex = null;
   
   (function createResults(){
      results = contest.results.map(function(result){
         return Result(result);
      });
   })();

   (function setWinner(){
      if (results.length == 0) return (winner = -1);
      if (results.length == 1) return (winner = results[0].candidateId);
      var valueHash = {};

      var keysSorted = []
      results.forEach(function(result){
         valueHash[result.candidateId] = ((valueHash[result.candidateId] || 0) + result.delegateCount);
      });
      keysSorted = Object.keys(valueHash);
      keysSorted.sort(function(a,b){
         return valueHash[b] - valueHash[a];
      });
      if(valueHash[keysSorted[0]] === valueHash[keysSorted[1]]) winner = 0;
      if(stateLabel == "NY"){
      }
      
      totalsByCandidates =  valueHash;
      if(stateLabel == "NY"){
      }
      winner = parseInt(keysSorted[0], 10)
      
   })();




   var update = function update(candidate, value){
      difference = value - totalsByCandidates[candidate];
      var result = results.find(function(r){
         return (r.candidateId === candidate && r.delegateType === "user")
      });
      if(result){
         result.updateDelegateCount(difference);
      }else{
         results.push(Result({candidateId: candidate, delegateCount: difference, delegateType: "user"}));
      }
      totalsByCandidates[candidate.toString()] = value;
      return updateWinner();
   }
// refactor
   var updateWinner = function(){
      var oldWinner = winner;

      keys = Object.keys(totalsByCandidates);
      keys.sort(function(a, b){
         return totalsByCandidates[b] - totalsByCandidates[a];
      });

      if((keys.length > 1 && totalsByCandidates[keys[0]] > totalsByCandidates[keys[1]]) || (keys.length === 1 && totalsByCandidates[keys[0]] > 0)){
         winner = parseInt(keys[0], 10);
      }else{ 
         winner = 0;
      } 
      return [oldWinner, winner];
   }

   return {
      state: state,
      date:  new Date(date),
      contestType:  contestType,
      numberDelegates:  numberDelegates,
      results: results,
      stateLabel: stateLabel,
      winner: winner,
      totalsByCandidates: totalsByCandidates,
      update: update,
      name: contest.state.name
   }
}
