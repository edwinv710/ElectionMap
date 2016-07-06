// TODO: Base 64 for winner-takes-all so it allows more than 10 candidates

var UserContestCode = function(contests, candidates, variable){

   var statesIndex = {};
   var code = "";
   var numCandidates = candidates.length;
   var candididatesIndex = {};

   var contestCodes = [];

   var type = null;

   var decode = function(){
      var tempVariable = variable;
      for(var i = 0; i < contests.length; i++){
         if(tempVariable.length === 0) break;
         if(contests[i].rule === "proportional") var contestCode =  proportionalContestCodeObject(contests[i], tempVariable);
         if(contests[i].rule != "proportional")  var contestCode =  winnerTakesAllContestCodeObject(contests[i], tempVariable);
         if(contestCode === null) break;
         setType(contests[i].rule);
         tempVariable = tempVariable.slice(contestCode.size);
         contestCodes.push(contestCode);
      }
      fill();
   }

   var setType = function(newType){
      if(!type) return type = newType;
      if(type != newType && type != "mixed") return type = "mixed";
   }

   var proportionalContestCodeObject = function(contest, currentVariable){
      var size =  contest.numberDelegates.toString().length * numCandidates;
      var variablePortion = currentVariable.slice(0, size);
      var encodedValues = variablePortion.match(new RegExp('.{1,'+size/numCandidates+'}', "g"));
      var values = encodedValues.map(function(val){return parseInt(val)});
      var sum = values.reduce(function(previousValue, currentValue, currentIndex, array) {
        return previousValue + currentValue;
      });
      if(sum > contest.numberDelegates) return null;
      return {
         strings: encodedValues,
         values: values,
         size: size
      };
   }

   var winnerTakesAllContestCodeObject = function(contest, currentVariable){
      var size = (numCandidates - 1).toString().length;
      var winnerIndex = parseInt(currentVariable.slice(0, size)) - 1;
      if(winnerIndex >= numCandidates) return null; 
      var winnerPosition = (winnerIndex+1).toString();
      var encodedValues = Array.apply(null, Array(numCandidates)).map(Number.prototype.valueOf,0);
      encodedValues[winnerIndex] = contest.numberDelegates
      return {
         strings: [winnerPosition],
         values: encodedValues,
         size: size
      };
   }

   var fill = function(){
      var startingIndex = contestCodes.length;
      for(var i = startingIndex; i < contests.length; i++){
         contestCodes.push(initializeContest(contests[i]));
      }
   }

   var initializeContest = function(contest){
      setType(contest.rule);
      if(contest.rule === "proportional"){
         var size =  contest.numberDelegates.toString().length;
         var value = "000000000000000".slice(0,size);
         var valueArray = Array.apply(null, Array(numCandidates)).map(function(){return value});
         return {
            strings: valueArray,
            values: valueArray.map(function(val){return parseInt(val)})
         };
      }
      return {
         strings: ["0"],
         values: Array.apply(null, Array(numCandidates)).map(Number.prototype.valueOf,0)
      };
   }

   function initialize(){
      for(var i = 0; i < candidates.length; i++) candididatesIndex[candidates[i].id.toString()] = i;
      for(var i = 0; i < contests.length; i++) statesIndex[contests[i].stateLabel] = i;
      if(variable && !(/\D/.test(variable))) decode();
      fill();
      updateCode();
   }

   var updateProportional = function(codeObject, candidateIndex, value){
      var filler = "000000000000000";
      var size = value.toString().length;
      var currentSize = codeObject.strings[candidateIndex].length;
      codeObject.strings[candidateIndex] = filler.slice(0,currentSize - size)+value.toString();
   }

   var updateWinnerTakesAll = function(codeObject, candididateIndex, value){
      var currentWinner = codeObject.strings[0];
      var currentCandidate = (candididateIndex+1).toString();
      if(currentWinner === currentCandidate && value === 0) {codeObject.strings = ["0"]};
      if(currentWinner != currentCandidate && value > 0) {codeObject.strings = [currentCandidate]};
   }

   var update = function(contest, candidate, value){

      var codeObject = contestCodes[statesIndex[contest.stateLabel]];
      var candidateIndex = candididatesIndex[candidate.toString()];
      if(contest.rule === "proportional") updateProportional(codeObject, candidateIndex, value)
      if(contest.rule != "proportional") updateWinnerTakesAll(codeObject, candidateIndex, value)
      codeObject.values[candidateIndex] = value;
      updateCode();
   }

   var updateCode = function(){
      code = contestCodes.map(function(code){return code.strings.join("")}).join("");
      if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?val='+code;
        window.history.pushState({path:newurl},'',newurl);
      }
   }


   initialize();
   console.log(type);
   
   return {
      contestCodes: contestCodes,
      code: code,
      update: update,
      type: type
   }
   
}