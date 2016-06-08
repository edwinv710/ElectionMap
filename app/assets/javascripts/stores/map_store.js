MapStore = function(election){
  
  var data = {};

  var createMapStore = function(){
      election.contests.forEach(function(contest){
       if(contest.winner > 0){
         var candidateIndex = election.candidateIdToIndex[contest.winner.toString()];
         data[contest.stateLabel] = election.candidates[candidateIndex].color;
       }else{ data[contest.stateLabel] = USMapConfig.config.defaultFillColor; }
      });
  };
   

   (function initialize(){
      createMapStore();
   })();

   return {
    data: data
   }
}