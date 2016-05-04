class ElectionsController < ApplicationController

   def show
      @election = Election.find(params[:id])
      setup_gon_election
      @candidates_sorted_by_delegate_count = @election.candidates_sorted_by_delegate_count
   end


   def setup_gon_election
      gon.election = @election.jObject
   end
   

end
