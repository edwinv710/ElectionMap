class ChangeStatusFromStringToIntegerInCandidate < ActiveRecord::Migration[5.0]
  def change
   change_column :candidates, :status, :integer
  end
end
