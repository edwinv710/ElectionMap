class AddTotalSuperDelegatesToElection < ActiveRecord::Migration[5.0]
  def change
    add_column :elections, :total_super_delegates, :integer
  end
end
