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
   var isComplete = false;

   var userResults = [];
   

   var createResults = function(){
      results = contest.results.map(function(result){
         return Result(result);
      });
      results.forEach(function(result){
         totalsByCandidates[result.candidateId] = ((totalsByCandidates[result.candidateId] || 0) + result.delegateCount);
      });
   }

   var setWinner = function(){
      winner = getWinner();   
      // console.log("Winner for "+stateLabel+" is "+winner)
   }

   var setCompletion = function(){
      isComplete = (Object.keys(totalsByCandidates).length > 0);


   }

   var resetValues = function(){
      Object.keys(totalsByCandidates).forEach(function(key){
         totalsByCandidates[key] = 0;
      });

      results.forEach(function(result){
         result.setDelegateCount(0);
      });
   };

   var update = function(candidateId, value){
      if(this.rule != "proportional" && value > 0) resetValues();
      var result = results.find(function(r){ return r.belongsTo(candidateId)});
      if(result){
         var difference = value - totalsByCandidates[candidateId];
         result.updateDelegateCount(difference);
      }else{
         var newResult = Result({candidateId: candidateId, delegateCount: value, delegateType: "user"});
         userResults.push(newResult);
         results.push(newResult);
      }
      totalsByCandidates[candidateId] = value;
      
      this.winner = getWinner();
   }


   var getWinner = function(){
      if (results.length == 0) return  -1;
      if (results.length == 1) return results[0].candidateId;
      

      var keysSorted = Object.keys(totalsByCandidates).sort(function(a, b){
         return totalsByCandidates[b] - totalsByCandidates[a];
      });

      var isTied = (totalsByCandidates[keysSorted[0]] === totalsByCandidates[keysSorted[1]]);
      return (isTied ? 0 : parseInt(keysSorted[0], 10));
   }

   createResults();
   setWinner();
   setCompletion();

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
      name: contest.state.name,
      rule: contest.rule,
      userResults: userResults,
      isComplete: isComplete
   }
}