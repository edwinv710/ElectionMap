class AddIsActiveToElection < ActiveRecord::Migration[5.0]
  def change
    add_column :elections, :is_active, :boolean, default: true
  end
end
