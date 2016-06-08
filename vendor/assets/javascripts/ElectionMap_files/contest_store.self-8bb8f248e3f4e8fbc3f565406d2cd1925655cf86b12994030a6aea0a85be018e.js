ContestStore = function(election) {

   var data = {};

   var setResultForContest = function(contest) {
      election.candidates.forEach(function(candidate) {
         data[contest.state.symbol].results[candidate.id.toString()] = {
            delegateCount: contest.totalsByCandidates[candidate.id.toString()] || 0,
            firstName: candidate.firstName,
            lastName: candidate.lastName
         };
      });
   };

   var update = function(state, candidateId, value){
      data[state].results[candidateId.toString()].delegateCount = value;
   };

   var delegateCount = function(state, candidateId){
      return data[state].results[candidateId.toString()].delegateCount;
   };

   var setWinner = function(state, candidateId){
      data[state].winner = parseInt(candidateId, 10);
   }

   var createContestStore = function() {
      election.contests.forEach(function(contest) {
         data[contest.state.symbol] = {
            name: contest.state.name,
            winner: contest.winner,
            date: contest.date,
            type: contest.contestType,
            abbreviation: contest.state.symbol,
            results: {},
            numberDelegates: contest.numberDelegates
         }
         setResultForContest(contest);
      });
   };


   (function initialize() {
      createContestStore();
   })();

   return {
      data: data,
      update: update,
      delegateCount: delegateCount
   };
}
