ElectionConductor = function(electionObject){

   var mapStore = {};
   var candidateStore = [];
   var contestStore = {};
   var election = Election(electionObject);
   var targetComponent;
   var updateFunction;
   var map;

   (function setMapStore(){
      election.contests.forEach(function(contest){
         if(contest.winner > 0){
            // console.log(election.candidates)
            var candidateIndex = election.candidateIdToIndex[contest.winner.toString()]
            mapStore[contest.stateLabel] = election.candidates[candidateIndex].color;
         }else{
            mapStore[contest.stateLabel] = USMapConfig.config.defaultFillColor;
         }
      });
   })();

   (function setContestStore(){
      election.contests.forEach(function(contest){
         contestStore[contest.state.symbol] = {name: contest.state.name, abbreviation: contest.state.symbol, "results": {}}
         election.candidates.forEach(function(candidate){
            contestStore[contest.state.symbol]["results"][candidate.id.toString()] = {};
            contestStore[contest.state.symbol]["results"][candidate.id.toString()].delegateCount = contest.totalsByCandidates[candidate.id.toString()] || 0
            contestStore[contest.state.symbol]["results"][candidate.id.toString()].firstName = candidate.firstName;
            contestStore[contest.state.symbol]["results"][candidate.id.toString()].lastName = candidate.lastName;
         });
      });
   })();

   (function setCandidateStore(){
      candidateStore = election.candidates.map(function(candidate){
         return {id: candidate.id, firstName: candidate.firstName, lastName: candidate.lastName, color: candidate.color, delegateCount: candidate.delegateCount};
      });
      // console.log(candidateStore);
      sortCandidateStore();
   })();

   function sortCandidateStore(){
      candidateStore.sort(function(a, b){
         return b.delegateCount - a.delegateCount;
      });
   }

   function setUpdate(target, method){
      targetComponent = target;
      updateFunction = method;
   }

   function createMap(){
      var that = this;
      map = Map(mapStore);
      map.createMap();
      map.onStateSelect(function(state){
         that.setActive(state);
      });
   }

   function updateComponent(result){
      updateFunction.call(targetComponent, result)
   }
   function setActive(state){
      updateFunction.call(targetComponent, {activeState: state});
   }

   var updateStateResult = function(state, candidateId, value){
      winners = election.updateContest(state, candidateId, value);
      difference = value - contestStore[state].results[candidateId].delegateCount
      contestStore[state].results[candidateId].delegateCount = value;
      candidate = candidateStore.find(function(candidate){
         return (candidate.id == parseInt(candidateId));
      });
      candidate.delegateCount += difference;
      sortCandidateStore();
      updateComponent({contestStore: contestStore, candidateStore: candidateStore});
      if(winners[0] != winners[1]) updateMapWinner(state, winners[1]);
   }

   function updateMapWinner(state, candidate){
      var c = candidateStore.find(function(c){
         return (c.id === parseInt(candidate));
      })

      var color =  (c ? c.color : CANDIDATECOLORS[0]);

      map.updateContest(state, color);
   }

   return {
      mapStore: mapStore,
      createMap: createMap,
      candidateStore: candidateStore,
      contestStore: contestStore,
      setUpdate: setUpdate,
      updateStateResult: updateStateResult,
      setActive: setActive
   }
}