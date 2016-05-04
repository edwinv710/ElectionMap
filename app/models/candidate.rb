class Candidate < ApplicationRecord
   validates :first_name, presence: true
   validates :last_name, presence: true
   validates :affiliation, presence: true
   validates :status, presence: true

   has_and_belongs_to_many :candidates
   has_many :results

   def delegate_count_in_election(election_id)
      results.joins(:contest).where("contests.election_id = ?", election_id).pluck("SUM(results.delegate_count")
   end

   def full_name
      "#{first_name} #{last_name}"
   end

   def friendly_name
     
   end
end
