class ChangeTypeToElectionTypeInElection < ActiveRecord::Migration[5.0]
  def change
      rename_column :elections, :type, :process_type
  end
end
