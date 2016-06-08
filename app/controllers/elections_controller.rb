class ElectionsController < ApplicationController

   def show
      @election = Election.find_by_friendly_url_path(params[:id])
      setup_gon_election
   end


   def setup_gon_election
      builder = JSON.parse(@election.to_builder.target!)
      gon.push({election: builder})
   end
   

end
