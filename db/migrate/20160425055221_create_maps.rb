class CreateMaps < ActiveRecord::Migration[5.0]
  def change
    create_table :maps do |t|
      t.string :type
      t.integer :year

      t.timestamps
    end
  end
end
