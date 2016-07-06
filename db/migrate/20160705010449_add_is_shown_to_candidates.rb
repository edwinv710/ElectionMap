class AddIsShownToCandidates < ActiveRecord::Migration[5.0]
  def change
    add_column :candidates, :is_shown, :boolean
  end
end
