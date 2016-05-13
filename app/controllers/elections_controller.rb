class ElectionsController < ApplicationController

   def show
      @election = Election.find(params[:id])
      setup_gon_election
   end


   def setup_gon_election
      builder = JSON.parse(@election.to_builder.target!)
      gon.push({election: builder})
   end
   

end
