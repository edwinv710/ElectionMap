class Contest < ApplicationRecord

   validates :state_id, presence: true, uniqueness: {scope: [:election_id]}
   validates :date, presence: true
   validates :contest_type, presence: true
   validates :number_delegates, presence: true
   validates :election_id, presence: true

   belongs_to :election, inverse_of: :contests
   belongs_to :state, inverse_of: :contests

   has_many :results


   def self.without_pledged_results
      self.joins(:results).where.not(results: { delegate_type: "pledged"} )
   end

   def to_builder
      Jbuilder.new do |contest|
         contest.state state.to_builder
         contest.date date
         contest.contestType contest_type
         contest.numberDelegates number_delegates
         contest.results results.collect { |result| result.to_builder }
      end
   end

end
