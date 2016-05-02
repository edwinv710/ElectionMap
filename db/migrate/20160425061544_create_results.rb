class CreateResults < ActiveRecord::Migration[5.0]
  def change
    create_table :results do |t|
      t.integer :map_id
      t.integer :state_id
      t.integer :candidate_id
      t.integer :delegate_count

      t.timestamps
    end
  end
end
