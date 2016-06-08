var Result = function(result){
   var candidateId = result.candidateId;
   var delegateCount = result.delegateCount;
   var delegateType = result.delegateType;

   var updateDelegateCount = function(value){
      this.delegateCount = this.delegateCount + value;
   }

   return {
      candidateId: candidateId,
      delegateCount: delegateCount,
      delegateType: delegateType,
      updateDelegateCount: updateDelegateCount
   }
}