require 'rails_helper'

RSpec.describe ElectionsController, :type => :controller do

   describe "GET #show" do

      let(:election) {create(:election)}

      it "should grab the requested election and set it to @election" do
         get :show, id: election.id
         expect(assigns(:election)).to eq(election)
      end
      
      it "should render the :show template" do
         get :show, id: election.id
         expect(response).to render_template(:show)
      end

   end

end
