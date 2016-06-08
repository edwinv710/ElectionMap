var Candidate = function(candidate, index){

   var id = candidate.id;
   var firstName = candidate.firstName;
   var lastName = candidate.lastName;
   var affiliation = candidate.affiliation;
   var status = candidate.status;
   var delegateCount = candidate.delegateCount;  
   var imageUrl = candidate.imageUrl;
   var bannerUrl = candidate.bannerUrl;
   var websiteUrl = candidate.websiteUrl;
   var description = candidate.description;
   var fullName = firstName.concat(" ", lastName);
   var lastCompetitiveDate = candidate.lastCompetitiveDate ? new Date(candidate.lastCompetitiveDate) : null;

   function hexToRgba(hex, opacity) {
      opacity = opacity || 1;
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
         r: parseInt(result[1], 16),
         g: parseInt(result[2], 16),
         b: parseInt(result[3], 16),
         a: opacity,
         toString: function(){
            return "rgba("+this.r+", "+this.g+","+this.b+","+this.a+")"
         }
      } : null;
   }

   var color = (function setColor(){
      return CANDIDATECOLORS[index % CANDIDATECOLORS.length];
   })();

   var setCandidateSpecificStyles = (function(){
      $('<style>.ui.toggle.checkbox input:checked ~ .box:before, .ui.toggle.checkbox input:checked ~ label.candidate'+id+':before{background-color:'+color+' !important;}</style>').appendTo('head');
      $('<style>.slider.candidate'+id+' .ui-widget-header{background-color:'+color+' !important;}</style>').appendTo('head');
   })();

   var rgba = function(opacity){
      return hexToRgba(color, opacity);
   }

   return {
      id: id,
      firstName: firstName,
      lastName: lastName,
      affiliation: affiliation,
      status: status, 
      delegateCount: delegateCount,
      color: color,
      imageUrl: imageUrl,
      bannerUrl: bannerUrl,
      rgba: rgba,
      websiteUrl: websiteUrl,
      description: description,
      fullName: fullName,
      lastCompetitiveDate: lastCompetitiveDate,
      superDelegateCount: candidate.superDelegateCount,
      pledgedDelegateCount: candidate.pledgedDelegateCount
   }
}