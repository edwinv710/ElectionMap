var Candidate = function(candidate, index){

   var lastCompetitiveDate = candidate.lastCompetitiveDate ? new Date(candidate.lastCompetitiveDate) : null;
   var color = CANDIDATECOLORS[index % CANDIDATECOLORS.length];


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

   var rgba = function(opacity){
      return hexToRgba(color, opacity);
   }

   var setCandidateSpecificStyles = function(){
      $('<style>.ui.toggle.checkbox input:checked ~ .box:before, .ui.toggle.checkbox input:checked ~ label.candidate'+candidate.id+':before{background-color:'+color+' !important;}</style>').appendTo('head');
      $('<style>.slider.candidate'+candidate.id+' .ui-widget-header{background-color:'+color+' !important;}</style>').appendTo('head');
   }

   setCandidateSpecificStyles();

   return {
      id: candidate.id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      affiliation: candidate.affiliation,
      status: candidate.status, 
      delegateCount: candidate.delegateCount,
      color: color,
      imageUrl: candidate.imageUrl,
      bannerUrl: candidate.bannerUrl,
      rgba: rgba,
      websiteUrl: candidate.websiteUrl,
      description: candidate.description,
      fullName: candidate.firstName.concat(" ", candidate.lastName),
      lastCompetitiveDate: lastCompetitiveDate,
      superDelegateCount: candidate.superDelegateCount,
      pledgedDelegateCount: candidate.pledgedDelegateCount
   }
}