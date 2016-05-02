class AddYearToElection < ActiveRecord::Migration[5.0]
  def change
    add_column :elections, :year, :integer
  end
end
