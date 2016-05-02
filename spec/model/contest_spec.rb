require "spec_helper"
require "contest"

describe Contest do

  let(:state) {State.create(name: "New York", symbol: "ny")}
  let(:election) {Election.create(name: "Republican Primary", affiliation: "republican", process_type: "primary", year: 2016)}
  let(:candidate) {Candidate.create(first_name: "Edwin", last_name: "Velasquez", affiliation: "Republican", status: "active")}


  it "should belongs to election" do
    expect(Contest.reflect_on_association(:election).macro).to eq(:belongs_to)
  end

  it "should belong to state" do
    expect(Contest.reflect_on_association(:state).macro).to eq(:belongs_to)
  end

  it "should have many states" do
    expect(Contest.reflect_on_association(:results).macro).to eq(:has_many)
  end

  describe "#create" do

    
    context "all neccessary parameters where included" do
      it "should be valid" do
        contest = build(:contest, :with_election)
        expect(contest.valid?).to eq(true)
      end

      it "should be invalid if state, election_id are already included in another model" do
        date = DateTime.now
        contest = create(:contest, state: state, election: election)
        contest_dup = build(:contest, state: state, election: election)
  
        expect(contest_dup.valid?).to eq(false)
      end
    end

    context "parameters are missing" do
      it "should not be valid" do
        date = DateTime.now
        expect(build(:contest, :with_election, state: nil).valid?).to eq(false)
        expect(build(:contest, :with_election, date: nil).valid?).to eq(false)
        expect(build(:contest, :with_election, contest_type: nil).valid?).to eq(false)
        expect(build(:contest, election: nil).valid?).to eq(false)
        expect(build(:contest, :with_election, number_delegates: nil).valid?).to eq(false)

      end
    end

  end

  describe ".without_pledged_results" do
    it "should return all contests that does not have pledged results" do

      date = DateTime.now

      state1 = State.create(name: "New York", symbol: "ny")
      state2 = State.create(name: "New Jersey", symbol: "nj")
      state3 = State.create(name: "Vermont", symbol: "vt")
      state4 = State.create(name: "Florida", symbol: "fl")
      
      contest1 = Contest.create(state_id: state1.id, date: date, contest_type: "republican_primary", election_id: election.id, number_delegates: 200)
      contest2 = Contest.create(state_id: state2.id, date: date, contest_type: "republican_primary", election_id: election.id, number_delegates: 200)
      contest3 = Contest.create(state_id: state3.id, date: date, contest_type: "republican_primary", election_id: election.id, number_delegates: 200)
      contest4 = Contest.create(state_id: state4.id, date: date, contest_type: "republican_primary", election_id: election.id, number_delegates: 200)

      result1 = Result.create(candidate_id: candidate.id, delegate_count: 20, delegate_type: "super", contest_id: contest1.id)
      result2 = Result.create(candidate_id: candidate.id, delegate_count: 20, delegate_type: "pledged", contest_id: contest2.id)
      result3 = Result.create(candidate_id: candidate.id, delegate_count: 20, delegate_type: "pledged", contest_id: contest3.id)
      result4 = Result.create(candidate_id: candidate.id, delegate_count: 20, delegate_type: "super", contest_id: contest4.id)

      expect(Contest.without_pledged_results).to eq([contest1, contest4])

    end
  end

  

end