class CreateStates < ActiveRecord::Migration[5.0]
  def change
    create_table :states do |t|
      t.string :name
      t.string :symbol
      t.integer :republican_pledged_delegates
      t.integer :democrat_pledged_delegates
      t.integer :democrat_super_delegates
      t.integer :general_delegates

      t.timestamps
    end
  end
end
