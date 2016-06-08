class AdDBannerUrlToCandidate < ActiveRecord::Migration[5.0]
  def change
    add_column :candidates, :banner_url, :string
  end
end
