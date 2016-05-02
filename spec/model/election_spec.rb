require "spec_helper"
require "election"

describe Election do

  it "should include the association has_many for contests" do 
    expect(Election.reflect_on_association(:contests).macro).to eq(:has_many)
  end

  it "should have many candidates" do
    expect(Election.reflect_on_association(:candidates).macro).to eq(:has_and_belongs_to_many)
  end

  describe "#create" do
    context "all neccessary parameters where included" do
      it "should be valid" do
        election = build(:election)
        expect(election.valid?).to eq(true)
      end

      it "should be invalid if an election with the same affiliation, type, and year is already included" do
        election = create(:election, year: 2016)
        election_dup_different_name = build(:election, name: "Republican Primary", year: 2016)
        expect(election_dup_different_name.valid?).to eq(false)
      end
    end

    context "parameters are missing" do
      it "should not be valid" do
        expect(build(:election, name: nil).valid?).to eq(false)
        expect(build(:election, affiliation: nil).valid?).to eq(false)
        expect(build(:election, process_type: nil).valid?).to eq(false)
        expect(build(:election, year: nil).valid?).to eq(false)
      end
    end

  end

  describe "states" do 
    it "should return every state associated with every contest in the election" do
      State.create(name: "Vermont", symbol: "vt")
      states = {ny: State.create(name: "New York", symbol: "ny"), nj: State.create(name: "New Jersey", symbol: "nj"), pa: State.create(name: "Pennsylvania", symbol: "pa")}
      election = Election.create(name: "Republican Primary", affiliation: "republican", process_type: "primary", year: 2016)       
      dates = {ny: DateTime.new(2016, 3, 2), nj: DateTime.new(2015, 1, 2), pa: DateTime.new(2020, 3, 2)}
      states.keys.each do |key|
        Contest.create(state_id: states[key].id, date: dates[key], contest_type: "caucus", number_delegates: 200, election_id: election.id)
      end

      expect(election.states).to eq([states[:nj], states[:ny], states[:pa]])
    end
  end

  describe "start_and_end_date" do
    it "should return the dates for the first and last contests" do
      State.create(name: "Vermont", symbol: "vt")
      states = {ny: State.create(name: "New York", symbol: "ny"), nj: State.create(name: "New Jersey", symbol: "nj"), pa: State.create(name: "Pennsylvania", symbol: "pa")}
      election = Election.create(name: "Republican Primary", affiliation: "republican", process_type: "primary", year: 2016)       
      dates = {ny: DateTime.new(2016, 3, 2), nj: DateTime.new(2015, 1, 2), pa: DateTime.new(2020, 3, 2)}
      contest = {}
      states.keys.each do |key|
        contest[key] = Contest.create(state_id: states[key].id, date: dates[key], contest_type: "caucus", number_delegates: 200, election_id: election.id)
      end

      expect(election.start_and_end_dates).to eq([contest[:nj].date.strftime("%Y-%m-%d %H:%M:%S"), contest[:pa].date.strftime("%Y-%m-%d %H:%M:%S")])
    end
  end

  describe "candidates_sorted_by_delegate_count" do
    it "should return candidates sorted by delegate count" do
      election = create(:election_with_contests_and_results)
      candidates = election.candidates_sorted_by_delegate_count
      candidate_array = candidates.map{|x| [x.first_name, x.last_name, x.delegate_count]} 
      expect(candidate_array).to eq([["Jane", "Doe", 300], ["Poo", "Bear", 225], ["John", "Doe", 150]])
    
    end
  end

  describe ".active" do
    it "should return all active elections" do
        election1 = Election.create(name: "Republican Primary", affiliation: "republican", process_type: "primary", year: 2016)       
        election2 = Election.create(name: "Democratic Primary", affiliation: "democrat", process_type: "primary", year: 2016)  
        election3 = Election.create(name: "Republican Primary", affiliation: "democrat", process_type: "primary", year: 2008, is_active: false)  
        election4 = Election.create(name: "Democratic Primary", affiliation: "democrat", process_type: "primary", year: 2008, is_active: false)  

        expect(Election.active).to eq([election1, election2])
    end
  end

end