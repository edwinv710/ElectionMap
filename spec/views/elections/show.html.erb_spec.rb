describe 'elections/show.html.erb' do

  it "displays title as the name of the election" do
    assign(:election, create(:election, name: "Republican Primary"))

    render

    expect(rendered).to include("Republican Primary")
  end

  context "has some contests" do
    it "displays the state name for each contest" do
      state_array = [["CState1", "CS1"], ["CState2", "CS2"], ["CState3", "CS3"], ["CState4", "CS4"], ["CState5", "CS5"], 
        ["CState6", "CS6"], ["CState7", "CS7"], ["CState8", "CS8"], ["CState9", "CS9"], ["CState10", "CS10"]]
      assign(:election, create(:election_with_contests, state_array: state_array))
      render
      expect(rendered).to include(*state_array.map(&:first))
    end

    it "displays number of delegates for each contest" do
      assign(:election, create(:election_with_contests))
      render
      expect(rendered).to include("10", "11", "12", "13", "14", "15", "16", "17", "18", "19")
    end
  end

  context "it has contests with results" do
    let(:election) { create(:election_with_contests_and_results) }
    it "should show candidates and total delegates" do
      assign(:election, election)
      render
      expect(rendered).to include("Jane Doe - 300", "Poo Bear - 225",  "John Doe - 150")
    end

    it "show each candidate in the table" do
      assign(:election, election)
      render
      expect(rendered).to include("<th>John Doe</th>", "<th>Jane Doe</th>", "<th>Poo Bear</th>")
    end

    it "displays all of the delegate count in tables" do
      assign(:election, election)
      render
      expect(rendered).to include("<th> 100 </th>", "<th> 200 </th>", "<th> 150 </th>", "<th> 50 </th>", "<th> 100 </th>", "<th> 75 </th>")
    end
  end






end