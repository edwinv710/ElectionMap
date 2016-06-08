CandidateStore = function(election) {

   var data = [];

   var sort= function() {
      data.sort(function(a, b) {
         return b.delegateCount - a.delegateCount;
      });
   };

   var find = function(candidate){
      return data.find(function(c){
         return (c.id === parseInt(candidate));
      });
   };

   var createCandidateStore = function(){
      data = election.candidates.map(function(candidate) {
         return { 
            id: candidate.id, 
            firstName: candidate.firstName, 
            lastName: candidate.lastName, 
            color: candidate.color, 
            delegateCount: candidate.delegateCount, 
            imageUrl: candidate.imageUrl, 
            bannerUrl: candidate.bannerUrl, 
            rgba: candidate.rgba, 
            description: candidate.description, 
            websiteUrl: candidate.websiteUrl, 
            status: candidate.status ,
            lastCompetitiveDate: candidate.lastCompetitiveDate,
            superDelegateCount: candidate.superDelegateCount,
            pledgedDelegateCount: candidate.pledgedDelegateCount
         };
      });
   };


   (function initialize() {
      createCandidateStore();
      sort();
   })();

   return {
      data: data,
      sort: sort,
      find: find
   } 
   
}
