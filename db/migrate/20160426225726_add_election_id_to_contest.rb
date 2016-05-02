class AddElectionIdToContest < ActiveRecord::Migration[5.0]
  def change
    add_column :contests, :election_id, :integer
  end
end
