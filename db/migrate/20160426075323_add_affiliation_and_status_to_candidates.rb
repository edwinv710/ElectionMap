class AddAffiliationAndStatusToCandidates < ActiveRecord::Migration[5.0]
  def change
    add_column :candidates, :affiliation, :string
    add_column :candidates, :status, :string
  end
end
