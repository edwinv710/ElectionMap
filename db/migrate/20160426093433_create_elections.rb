class CreateElections < ActiveRecord::Migration[5.0]
  def change
    create_table :elections do |t|
      t.string :name
      t.string :affiliation

      t.timestamps
    end
  end
end
