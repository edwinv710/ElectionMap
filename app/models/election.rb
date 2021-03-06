class Election < ApplicationRecord

   validates :name, presence: true
   validates :affiliation,  presence: true, uniqueness: {scope: [:process_type, :year]}
   validates :process_type, presence: true
   validates :year, presence: true

   has_many :contests, -> {order 'date ASC'}
   has_and_belongs_to_many :candidates

   scope :active, -> {where(is_active: true)}

   def states
      self.contests.states
   end

   def start_and_end_dates
      contests.min_and_max_dates
   end

   def candidates_sorted_by_delegate_count
      candidates_with_delegate_count.order("delegate_count DESC")
   end

   def candidates_with_delegate_count
      self.candidates.participating_in_election(self.id)
   end

   def friendly_path
      name.split(" ").join("-")
   end

   def self.find_by_friendly_url_path(path)
      name = path.split("-").join(" ")
      self.find_by(name: name)
   end

   def to_builder
      Jbuilder.new do |election|
         election.name name
         election.processType process_type
         election.affiliation affiliation
         election.delegatesNeeded delegates_needed
         election.totalSuperDelegates total_super_delegates
         election.candidates candidates_with_delegate_count.collect { |candidate| JSON.parse(candidate.to_builder.target!) }
         election.contests   contests.collect   { |contest| JSON.parse(contest.to_builder.target!) }
      end
   end

end
