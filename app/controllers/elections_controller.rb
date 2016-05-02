class ElectionsController < ApplicationController

   def show
      @election = Election.find(params[:id])
   end

   

end
