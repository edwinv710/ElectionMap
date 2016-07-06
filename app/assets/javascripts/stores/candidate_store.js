CandidateStore = function(election) {

   var data = [];

   var sortCandidateStore = function(store) {
      store.sort(function(a, b) {
         return b.pledgedDelegateCount - a.pledgedDelegateCount;
      });
   };

   var sortByStatus = function(store){
      store.sort(function(a, b){
         return a.status - b.status;
      });
   };

   var sort = function(){
      sortCandidateStore(data);
   };

   var find = function(candidate){
      return this.data.find(function(c){
         return (c.id === parseInt(candidate));
      });
   };

   var update = function(e){
       createCandidateStore(e);
       
       sort();
   };


   var createCandidateStore = function(e){
      Array.prototype.splice.apply(data, [0, data.length].concat(e.candidates.map(function(candidate) {
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
            pledgedDelegateCount: candidate.pledgedDelegateCount,
            style: {opacity: ((candidate.status == "active") ? 1 : 0.5)}
         };
      })));
   };


   (function initialize() {
      createCandidateStore(election);
      sortByStatus(data);
      sortCandidateStore(data);
   })();

   return {
      data: data,
      sort: sort,
      find: find,
      update: update
   } 
   
}
