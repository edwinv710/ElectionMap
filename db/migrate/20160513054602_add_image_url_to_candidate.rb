class AddImageUrlToCandidate < ActiveRecord::Migration[5.0]
  def change
    add_column :candidates, :image_url, :string
  end
end
