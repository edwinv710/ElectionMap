TableStore = function(election){
  
  var data = { contestHeaders: [], candidatesHeaders: [], results: []};
  var headerMapping = {};
  var resultMapping = {}


  var tableHeaders = function(){
    return data.contestHeaders.concat(candidatesHeaders);      
  };

  var updateMapping = function(candidateId, header){
    headerMapping[candidateId.toString()] = header;
  }

  var setHeaders = function(){
      data.contestHeaders = ["Contest", "Type", "Date", "Delegates"]
      data.candidatesHeaders = election.candidates.map(function(candidate) {
         return candidate.fullName;
      });

  };

  var update = function(state, candidate, value){
    if(data.results[headerMapping[state]]){
      data.results[headerMapping[state]].candidatesResults[candidate.firstName.concat(" ", candidate.lastName)].value = value;
    }
  }

  var setResults = function(){
   data.results = election.contests.map(function(contest, index){
      var row = {contestInformation: {}, candidatesResults: {}};

      data.contestHeaders.forEach(function(header, index){
         var properties = ["name", "contestType", "date", "numberDelegates"];
         var currentProperty = properties[index];
         row.contestInformation[header] = {};
         row.contestInformation[header].value = contest[currentProperty];
      });
      data.candidatesHeaders.forEach(function(header, index){
         var candidate = election.candidates[index];
         if(!candidate.lastCompetitiveDate || (candidate.lastCompetitiveDate > contest.date)){
           var style = contest.winner === candidate.id ? {backgroundColor: candidate.color, color: "white", fontWeight: 900} : {};
           row.candidatesResults[header] = {};
           var contestResult = contest.results.find(function(result){return result.candidateId === candidate.id})

           updateMapping(candidate.id, header);
           row.candidatesResults[header].value = contestResult ? contestResult.delegateCount : 0;
           row.candidatesResults[header].style = style;
           row.candidatesResults[header].id = candidate.id
         }
      });

      resultMapping[contest.state.symbol] = index;
      row.isComplete = (contest.winner > 0);
      row.symbol = contest.state.symbol;
      return row;
   });
   
  };
   

   (function initialize(){
      setHeaders();
      setResults();
   })();

   return {
      data: data,
      update: update
   }
}
