var Result = function(result){

   var updateDelegateCount = function(value){
      this.delegateCount = this.delegateCount + value;
   }

   var setDelegateCount = function(value){
      this.delegateCount = value;
   }

   var belongsTo = function(candidateId){
      return this.candidateId === candidateId && this.delegateType === "user";
   }


   return {
      candidateId: result.candidateId,
      delegateCount: result.delegateCount,
      delegateType: result.delegateType,
      updateDelegateCount: updateDelegateCount,
      belongsTo: belongsTo,
      setDelegateCount: setDelegateCount
   }
}