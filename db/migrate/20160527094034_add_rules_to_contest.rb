class AddRulesToContest < ActiveRecord::Migration[5.0]
  def change
    add_column :contests, :rule, :string
  end
end
