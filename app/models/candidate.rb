class Candidate < ApplicationRecord
   validates :first_name, presence: true
   validates :last_name, presence: true
   validates :affiliation, presence: true
   validates :status, presence: true

   has_and_belongs_to_many :candidates
   has_many :results

   def delegate_count_in_election(election_id)
      results.joins(:contest).where("contests.election_id = ?", election_id).total_delegate_count
   end

   def full_name
      "#{first_name} #{last_name}"
   end

   def contest_ids
      results.contest_ids
   end

   def to_builder
      Jbuilder.new do |candidate|
         candidate.firstName first_name
         candidate.lastName last_name
         candidate.affiliation affiliation
         candidate.status status
         candidate.contestIds contest_ids
      end
   end
end
