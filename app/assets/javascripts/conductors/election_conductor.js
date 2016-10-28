ElectionConductor = function(electionObject){

   console.log(electionObject);
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
      var states = election.contests.map(function(contest){return contest.state.symbol});
      map = Map(mapStore.data, function(element, state){
         $(window).scrollTo("."+state+"-row");
      });
      map.createMap(states);
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

   var updateStateResult = function(state, candidateId, value){
      election.update(state, candidateId, value);
      updateMapWinner(state, candidateId);
      candidateStore.update(election);
      tableStore.update(state, election);
      updateComponent({candidateStore: candidateStore.data, tableStore: tableStore.data});
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