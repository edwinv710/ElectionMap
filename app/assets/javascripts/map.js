var Election = function(name, processType, affiliation, candidates, results){

   var updateComponent = null;
   var component = null;

   var map = null;

   // function addMap(){

   // }

   function createMap(){
      map = Map(candidates, results);
      map.createMap();
   }

   function updateMap(){
      map.updateContest(results.update.state, results.update.winner);
   }

   function setUpdate(cThis, updateMethod){
      component = cThis;
      updateComponent = updateMethod;
   }

   var getWinner = function(stateResult){
      values = []

      for (var property in stateResult) {
          if (stateResult.hasOwnProperty(property)) {
              if (candidates.hasOwnProperty(property)){
               values.push([property, stateResult[property]]);
              }
          }
      }

      values = values.sort(function(a, b){
         return b[1] - a[1];
      });

      if(values[0][1] === values[1][1]){
         return "-1"
      }

      return values[0][0]
   }



   function setStateResult(stateAb, candidateID, value){
      var candidate = candidates[candidateID];
      var result = results[stateAb]
      var difference = value - result[candidateID]

      results[stateAb][candidateID] = value;
      candidates[candidateID].delegate_count = candidates[candidateID].delegate_count + difference;
      var winner = getWinner(results[stateAb]);
      results[stateAb]["winner"] = winner;
      results["update"] = {state: stateAb, candidate: candidateID, winner: winner}
      
      updateComponent.call(component, {results: results, candidates: candidates});

   }

   var candidatesSortedByDelegates = function(){
      var keys = Object.keys(candidates)
      keys = keys.sort(function(a,b){return candidates[b].delegate_count - candidates[a].delegate_count});
      console.log(JSON.stringify(keys.map(function(key){return candidates[key]})));
      return keys.map(function(key){return candidates[key]})
   }

   var candidateArray = function(){
      var keys = Object.keys(candidates);
      return keys.map(function(k){return candidates[k]});
   }






   return {
      name: name,
      processType: processType,
      affiliation: affiliation,
      candidates: candidates,
      results: results,
      setUpdate: setUpdate,
      setStateResult: setStateResult,
      candidatesSortedByDelegates: candidatesSortedByDelegates,
      updateMap: updateMap,
      createMap: createMap,
      candidateArray: candidateArray
   }
}

var election = Election(gon.election.name, gon.election.processType, gon.election.affiliation, gon.election.candidates, gon.election.results);