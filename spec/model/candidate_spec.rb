require "spec_helper"
require "candidate"

describe Candidate do

  describe "#create" do
    context "all required parameters are passed" do
      it "should be valid" do
        candidate = create(:candidate)
        expect(candidate.valid?).to eq(true)
      end
    end

    context "a required parameter is missing" do
      it "should not be valid" do
        expect(build(:candidate, first_name: nil).valid?).to eq(false)
        expect(build(:candidate, last_name: nil).valid?).to eq(false)
        expect(build(:candidate, affiliation: nil).valid?).to eq(false)
        expect(build(:candidate, status: nil).valid?).to eq(false)
      end
    end
  end

  describe "#image_url" do
    it "should return the image url passed" do
      candidate = build(:candidate, image_url: "http://google.com/")
      expect(candidate.image_url).to eq("http://google.com/")
    end
  end

  describe "#full_name" do
    it "should return the first name and last name combined into one string" do
      expect(build(:male_candidate).full_name).to eq("John Doe")
    end
  end

  describe "#contest_ids" do
    it "should call contest_ids method for the results associated with this candidate" do
      candidate = build(:candidate)
      results = double("results")
      allow(candidate).to receive(:results).and_return(results)
      allow(results).to receive(:contest_ids).and_return([1,2,6])
      contest_ids = candidate.contest_ids
      expect(results).to have_received(:contest_ids)
      expect(contest_ids).to eq([1,2,6])
    end
  end



  describe "#to_builder" do
    it "should return a hash with the first name, last name, affiliation, status, and contests ids for the candidate" do
      candidate = build(:female_candidate)
      allow(candidate).to receive(:contest_ids).and_return([1,3,5])
      expect(candidate.to_builder).to eq({"firstName": "Jane", "lastName": "Doe", "affiliation": "independant", "status": "active", "contestIds": [1, 3, 5]})
    end
  end



end