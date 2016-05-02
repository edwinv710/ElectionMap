class AddTypeToElection < ActiveRecord::Migration[5.0]
  def change
    add_column :elections, :type, :string
  end
end
