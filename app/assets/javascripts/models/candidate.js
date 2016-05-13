var Candidate = function(candidate, index){

   var id = candidate.id;
   var firstName = candidate.firstName;
   var lastName = candidate.lastName;
   var affiliation = candidate.affiliation;
   var status = candidate.status;
   var delegateCount = candidate.delegateCount;  

   var color = (function setColor(){
      return CANDIDATECOLORS[index % CANDIDATECOLORS.length]
   })();

   return {
      id: id,
      firstName: firstName,
      lastName: lastName,
      affiliation: affiliation,
      status: status, 
      delegateCount: delegateCount,
      color: color  
   }
}