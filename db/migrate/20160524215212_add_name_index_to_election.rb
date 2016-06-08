class AddNameIndexToElection < ActiveRecord::Migration[5.0]
  def change
   add_index(:elections, :name)
  end
end
