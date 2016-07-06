class ChangeIsShownInCandidates < ActiveRecord::Migration[5.0]
  def change
   change_column_default :candidates, :is_shown, true
  end
end
