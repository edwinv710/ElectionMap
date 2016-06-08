class AddLastCompetitiveDateToCandidates < ActiveRecord::Migration[5.0]
  def change
    add_column :candidates, :last_competitive_date, :datetime
  end
end
