ElectionConductor = function(electionObject){

   var election = Election(electionObject);
   var mapStore = MapStore(election);
   var candidateStore = CandidateStore(election);
   var contestStore = ContestStore(election);
   var tableStore = TableStore(election);
   var delegatesNeeded = election.delegatesNeeded;
   var targetComponent;
   var updateFunction;
   var map;
   var set;


   function setUpdate(target, method){
      targetComponent = target;
      updateFunction = method;
   }

   function createMap(){
      var that = this;
      map = Map(mapStore.data, function(element, state){
         $(window).scrollTo("."+state+"-row");
      });
      map.createMap();
      map.onStateSelect(function(state){
         that.setActive(state);
      });
   }

   function updateComponent(result){
      updateFunction.call(targetComponent, result);
   }
   function setActive(state){
      updateFunction.call(targetComponent, {activeState: state});
   }

   // var sortCandidateStore = function() {
   //    candidateStore.sort(function(a, b) {
   //       return b.delegateCount - a.delegateCount;
   //    });
   // };

   var updateTableStoreValue = function(state, candidate, value){
      tableStore.update(state, candidate, value);
   };

   var updateTableStoreWinner = function(oldWinnerId, newWinnerId, state){
      console.log("Updating from: "+oldWinnerId+" to "+newWinnerId);
      var oldWinner = election.candidates.find(function(candidate){
         return candidate.id === oldWinnerId;
      })
      var newWinner = election.candidates.find(function(candidate){
         return candidate.id === newWinnerId;
      })
      tableStore.results.forEach(function(result){
         if(result.symbol === state){
            if(oldWinner) result.candidatesResults[oldWinner.fullName].style = {};
            if(newWinner) result.candidatesResults[newWinner.fullName].style = {backgroundColor: newWinner.color} ;
         }
      });
   };

   var updateStateResult = function(state, candidateId, value){
      winners = election.updateContest(state, candidateId.toString(), value);
      difference = value - contestStore.delegateCount(state, candidateId);
      contestStore.update(state, candidateId, value);
      candidate = candidateStore.find(candidateId);
      candidate.delegateCount += difference;
      candidateStore.sort();
      updateTableStoreValue(state, candidate, value);
      
      if(winners[0] != winners[1]){
         updateMapWinner(state, winners[1]);
         setWinner(state, winners[1])
         updateTableStoreWinner(winners[0], winners[1], state);
      }
      updateComponent({contestStore: contestStore.data, candidateStore: candidateStore.data, tableStore: tableStore});
   }

   function updateMapWinner(state, winner){
      var candidate = candidateStore.find(winner);
      var color =  (candidate ? candidate.color : CANDIDATECOLORS[0]);
      map.updateContest(state, color);
   }

   return {
      mapStore: mapStore.data,
      createMap: createMap,
      candidateStore: candidateStore.data,
      contestStore: contestStore.data,
      setUpdate: setUpdate,
      updateStateResult: updateStateResult,
      setActive: setActive,
      tableStore: tableStore.data,
      delegatesNeeded: delegatesNeeded,
      totalSuperDelegates: election.totalSuperDelegates
   }
}
