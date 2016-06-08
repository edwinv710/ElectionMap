feature 'Visit the election page' do
  let (:election) {create(:election_with_contests_and_results)}
  
  scenario "Views the displayed map", js: true do
    election = create(:election_with_contests_and_results)
    visit election_path(election)

    expect(page).to have_css '#svggroup'
  end

  scenario "View the images for each candidate" do
    election = create(:election_with_contests_and_results, 
      male_candidate_image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Hillary_Clinton_crop.jpg",
      female_candidate_image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bernie_Sanders.jpg",
      other_candidate_image: "https://upload.wikimedia.org/wikipedia/en/4/42/The_Many_Adventures_of_Winnie_the_Pooh.jpg" )

      visit election_path(election)
      puts ("----- #{page.inspect}");
      expect(page).to have_content("https://upload.wikimedia.org/wikipedia/commons/8/84/Hillary_Clinton_crop.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/d/de/Bernie_Sanders.jpg", "https://upload.wikimedia.org/wikipedia/en/4/42/The_Many_Adventures_of_Winnie_the_Pooh.jpg")

  end



  scenario "click on a state", js: true do
   pending
   election = create(:election_with_contests_and_results)
   visit election_path(election)

   expect(page.find(".contest-box").find('h4')).to have_content("Texas")
  end
end

