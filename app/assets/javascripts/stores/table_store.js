TableStore = function(election){
  
  var data = { contestHeaders: [], candidatesHeaders: [], results: [], styles: []};
  var resultMapping = {};
  var candidateHeaderMapping = {};
  var colorMapping = {};


  var tableHeaders = function(){
    return data.contestHeaders.concat(candidatesHeaders);      
  };

  var updateMapping = function(candidateId, header){
    resultMapping[candidateId.toString()] = header;
  }

  var setHeaders = function(){
      data.contestHeaders = ["Contest", "Type", "Date", "Delegates"]
      data.candidatesHeaders = election.candidates.map(function(candidate) {
         return candidate.fullName;
      });

  };

  

  var setColorMapping = function(){
    election.candidates.forEach(function(candidate){
      colorMapping[candidate.id.toString()] = candidate.color;
    })
  }

  var updateValue = function(state, candidateId, value){
    if(data.results[resultMapping[state]]){
      var header = candidateHeaderMapping[candidateId.toString()];
      data.results[resultMapping[state]].candidatesResults[header].value = value;
    }
  }

  var resetColumn = function(state){
    var results = data.results[resultMapping[state]].candidatesResults;
    Object.keys(results).forEach(function(key){
      results[key].style = {};
      results[key].value = 0;
    });
  }


  var updateWinner = function(state, oldWinnerId, newWinnerId){
    var oldHeader = candidateHeaderMapping[oldWinnerId.toString()];
    var newHeader = candidateHeaderMapping[newWinnerId.toString()];    
    if(oldHeader) data.results[resultMapping[state]].candidatesResults[oldHeader].style = {};
    if(newHeader) data.results[resultMapping[state]].candidatesResults[newHeader].style = {backgroundColor: colorMapping[newWinnerId.toString()]};
  }

  var calibrateResults = function(state, e){
    var contest = e.contests[resultMapping[state]];
    resetColumn(state);
    contest.results.forEach(function(result){
      var header = candidateHeaderMapping[result.candidateId.toString()];
      data.results[resultMapping[state]].candidatesResults[header].value = result.delegateCount
      if(result.candidateId === contest.winner){
        data.results[resultMapping[state]].candidatesResults[header].style = {backgroundColor: colorMapping[result.candidateId.toString()] };
      } 
    });
  }

  var update = function(state, e){
    calibrateResults(state, e);
  }

  var setResults = function(){
   data.results = election.contests.map(function(contest, index){
      var row = {contestInformation: {}, candidatesResults: {}};

      data.contestHeaders.forEach(function(header, index){
         var properties = ["name", "contestType", "date", "numberDelegates"];
         var currentProperty = properties[index];
         row.contestInformation[header] = {value: contest[currentProperty]};
      });
      data.candidatesHeaders.forEach(function(header, index){
         var candidate = election.candidates[index];
         if(!candidate.lastCompetitiveDate || (candidate.lastCompetitiveDate > contest.date)){
           var style = contest.winner === candidate.id && contest.userResults.length === 0 ? {backgroundColor: candidate.color, color: "white", fontWeight: 900} : {};
           row.candidatesResults[header] = {};
           var contestResult = contest.results.find(function(result){return result.candidateId === candidate.id})

           updateMapping(candidate.id, header);
           row.candidatesResults[header].value = contestResult ? contestResult.delegateCount : 0;
           row.candidatesResults[header].style = style;
           row.candidatesResults[header].id = candidate.id
           row.candidatesResults[header].color = candidate.color
           candidateHeaderMapping[candidate.id.toString()] = header;
         }
      });

      resultMapping[contest.state.symbol] = index;
      row.isComplete = contest.isComplete;
      row.symbol = contest.state.symbol;
      row.rule = contest.rule;
      return row;
   });
   
  };
   

   (function initialize(){
      setHeaders();
      setResults();
      setColorMapping();
   })();

   return {
      data: data,
      update: update
   }
}