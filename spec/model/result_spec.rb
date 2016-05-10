require "spec_helper"
require "result"

describe Result do

  it "should belongs to contest" do
    expect(Result.reflect_on_association(:contest).macro).to eq(:belongs_to)
  end

  describe "#create" do

    let(:state) {State.create(name: "New York", symbol: "ny")}
    let(:election) {Election.create(name: "Republican Primary", affiliation: "republican", process_type: "primary", year: 2016)}
    let(:contest) {Contest.create(state_id: state.id, election_id: election.id,  date: DateTime.now, contest_type: "republican_primary", number_delegates: 200)}
    let(:candidate) {Candidate.create(first_name: "Edwin", last_name: "Velasquez", affiliation: "Republican", status: "active")}
    
    context "all neccessary parameters where included" do
      it "should be valid" do
        result = Result.new(candidate_id: candidate.id, delegate_count: 20, delegate_type: "super", contest_id: contest.id )
        result.valid?
        puts result.errors.inspect
        expect(result.valid?).to eq(true)
      end

      it "invalid if contest id, candidate id, and delegate type are already included in another election" do
        Result.create(candidate_id: candidate.id, delegate_count: 20, delegate_type: "super", contest_id: contest.id)
        result_dup = Result.new(candidate_id: candidate.id, delegate_count: 90, delegate_type: "super", contest_id: contest.id)
        expect(result_dup.valid?).to eq(false)
      end
    end

    context "parameters are missing" do
      it "should not be valid" do
        expect(Result.new(candidate_id: candidate.id, delegate_count: 20, delegate_type: "super", contest_id: contest.id).valid?).to eq(true)
        expect(Result.new(delegate_count: 20, delegate_type: "super", contest_id: contest.id).valid?).to eq(false)
        expect(Result.new(candidate_id: candidate.id, delegate_type: "super", contest_id: contest.id).valid?).to eq(false)
        expect(Result.new(candidate_id: candidate.id, delegate_count: 20,  contest_id: contest.id).valid?).to eq(false)
        expect(Result.new(candidate_id: candidate.id, delegate_count: 20, delegate_type: "super").valid?).to eq(false)

      end
    end
  end

  describe ".total_delegate_count" do
    it "should return 600 if there are three records where delegate counts are 100, 200, and 300 respectively" do
      build(:result, delegate_count: 100, delegate_type: "custom_one").save(validate: false)
      build(:result, delegate_count: 200, delegate_type: "custom_one").save(validate: false)
      build(:result, delegate_count: 300, delegate_type: "custom_one").save(validate: false)
      results = Result.where(delegate_type: "custom_one")
      expect(results.total_delegate_count).to eq(600)
    end
  end

  describe ".by_candidate" do
    it "should return all results by candidates" do
      candidate = create(:candidate)
      results = [
        build(:result, delegate_count: 100, delegate_type: "custom_one", candidate: candidate).save(validate: false),
        build(:result, delegate_count: 200, delegate_type: "custom_one").save(validate: false),
        build(:result, delegate_count: 300, delegate_type: "custom_one", candidate: candidate).save(validate: false)
      ]
      results = Result.where(delegate_type: "custom_one")
      expect(results.by_candidate(candidate.id)).to eq([results[0], results[2]])
    end
  end

  describe "#to_builder" do
    it "should resturn a json with the the candidate id, delegate count, and  delegate type" do
      result = build(:result, delegate_count: 200, delegate_type: "custom_one", candidate_id: 1)
      expect(result.to_builder).to eq({"candidateId": 1, "delegateCount": 2, "delegateType": "custom_one"})
    end
  end

  describe ".contest_ids" do
    it "should return all of the contest ids corresponding to the all of the results" do
      build(:result, contest_id:  5, delegate_type: "custom_one").save(validate: false)
      build(:result, contest_id:  8, delegate_type: "custom_one").save(validate: false)
      build(:result, contest_id: 12, delegate_type: "custom_one").save(validate: false)
      results = Result.where(delegate_type: "custom_one")
      expect(results.contest_ids).to eq([5, 8, 12])
    end
  end

  

end