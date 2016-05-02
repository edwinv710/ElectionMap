class AddContestIdToResults < ActiveRecord::Migration[5.0]
  def change
    add_column :results, :contest_id, :integer
    add_column :results, :delegate_type, :string
  end
end
