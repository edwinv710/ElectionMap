class AddDescriptionAndWebsiteUrlToCandidate < ActiveRecord::Migration[5.0]
  def change
    add_column :candidates, :description, :string
    add_column :candidates, :website_url, :string
  end
end
