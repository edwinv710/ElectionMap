class CreateCandidates < ActiveRecord::Migration[5.0]
  def change
    create_table :candidates do |t|
      t.string :first_name
      t.string :last_name
      t.integer :party_id

      t.timestamps
    end
  end
end
