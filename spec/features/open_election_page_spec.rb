feature 'Visit the election page' do
  let (:election) {create(:election_with_contests_and_results)}
  
  scenario "Views the displayed map", js: true do
   election = create(:election_with_contests_and_results)
    visit election_path(election)

    expect(page).to have_css '#svggroup'
  end

  scenario "click on a state", js: true do
   election = create(:election_with_contests_and_results)
   visit election_path(election)

   page.all(".hit-TX").click
   expect(page.find(".contest-box").find('h4')).to have_content("Texas")
  end
end

