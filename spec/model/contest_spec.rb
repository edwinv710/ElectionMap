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
      4.times {|i|  build(:contest).save(validate: false) }
      4.times do |i| 
        delegate_type = (i % 2 == 0 ? "super" : "pledged")
        build(:result, delegate_type: delegate_type, contest_id: (i+1)).save(validate: false)
      end
      expect(Contest.without_pledged_results).to eq([Contest.all[0], Contest.all[2]])
    end
  end

  describe "#to_builder" do
    it "should return the state json, date, contest type, number of delegates, and results array in a hash format" do
      date = DateTime.now
      contest = build(:ny_democratic_primary, date: date)
      contest.save(validate: false)
      results = [double("first result"), double("second result"), double("third result")]
      results.each_with_index do |r, i|
        allow(r).to receive(:to_builder).and_return({"candidateId": i, "delegateCount": i*2, "delegateType": "custom#{i}"})
      end
      allow(contest).to receive(:results).and_return(results)
      expect(contest.to_builder).to eq({
        "state": {"name": "New York", "symbol": "NY"}, "date": date, "contestType": "primary", "numberDelegates": 2000, 
        "results": [{"candidateId": 0, "delegateCount": 0, "delegateType": "custom0"}, 
                    {"candidateId": 1, "delegateCount": 2, "delegateType": "custom1"}, 
                    {"candidateId": 2, "delegateCount": 4, "delegateType": "custom2"}]
      })
    end

    describe ".states" do
      it "should call the find_all_by_contests method from the state class, passing itself" do
        allow(State).to receive(:find_all_by_contests).and_return([])
        Contest.states
        expect(State).to have_received(:find_all_by_contests)
      end
    end
  end

  

end