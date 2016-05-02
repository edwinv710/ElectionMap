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

  describe ".sorted_by_delegate_count" do
    it "should return cadidates sorted by the amount of delegate obtained in the election" do

    end
  end

  describe "#full_name" do
    it "should return the first name and last name combined into one string" do
      expect(build(:male_candidate).full_name).to eq("John Doe")
    end
  end



end