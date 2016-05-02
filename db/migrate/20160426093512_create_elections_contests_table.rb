class CreateElectionsContestsTable < ActiveRecord::Migration[5.0]
  def change
   create_table :contests_elections, id: false do |t|
      t.belongs_to :contest, index: true
      t.belongs_to :election, index: true
    end
  end
end
