require "spec_helper"
require "state"

describe State do

  it "should have many contests" do
    expect(State.reflect_on_association(:contests).macro).to eq(:has_many)
  end

  describe "#create" do

    context "all neccessary parameters where included" do
      it "should be valid" do
        state = build(:state)
        expect(state.valid?).to eq(true)
      end

      it "should be invalid if a state with the same name or symbols are created twice" do
        state            = create(:state, :new_york)
        state_dup_name   = build(:state, name: "New York")
        state_dup_symbol = build(:state, symbol: "NY")
        expect(state_dup_symbol.valid?).to eq(false)
        expect(state_dup_name.valid?).to eq(false)
      end
    end

    context "parameters are missing" do
      it "should not be valid" do
        expect(build(:state, name: nil).valid?).to eq(false)
        expect(build(:state, symbol: nil).valid?).to eq(false)
      end
    end

  end

  describe "to_builder" do
    it "should resturn a json with the name and state" do
      state = build(:state, :new_york)
      expect(state.to_builder).to eq({"name": "New York", "symbol": "NY"})
    end
  end

end