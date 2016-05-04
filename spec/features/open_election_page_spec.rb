feature 'Visit the election page' do
  let (:election) {create(:election_with_contests_and_results)}
  scenario "Views the displayed map", js: true do

    election = create(:election)
    visit election_path(create(:election))

    expect(page).to have_css '#svggroup'
  end
end

