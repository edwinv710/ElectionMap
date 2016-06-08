class AddDelegatesNeededToElection < ActiveRecord::Migration[5.0]
  def change
    add_column :elections, :delegates_needed, :integer
  end
end
