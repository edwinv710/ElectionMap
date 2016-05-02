class AddCandidatesElectionsTable < ActiveRecord::Migration[5.0]
  def change
   create_table :candidates_elections, id: false do |t|
      t.belongs_to :candidate, index: true
      t.belongs_to :election, index: true
   end
  end
end
