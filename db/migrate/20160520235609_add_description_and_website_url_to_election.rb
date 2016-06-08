class AddDescriptionAndWebsiteUrlToElection < ActiveRecord::Migration[5.0]
  def change
    add_column :elections, :description, :string
    add_column :elections, :website_url, :string
  end
end
