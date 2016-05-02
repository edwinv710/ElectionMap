class CreateContests < ActiveRecord::Migration[5.0]
  def change
    create_table :contests do |t|
      t.integer :state_id
      t.datetime :date
      t.integer :map_id
      t.string :contest_type
      t.integer :number_delegates

      t.timestamps
    end
  end
end
