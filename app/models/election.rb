class Election < ApplicationRecord

   validates :name, presence: true
   validates :affiliation,  presence: true, uniqueness: {scope: [:process_type, :year]}
   validates :process_type, presence: true
   validates :year, presence: true

   has_many :contests, -> {order 'date ASC'}
   has_and_belongs_to_many :candidates

   scope :active, -> {where(is_active: true)}

   def states
      self.contests.includes(:state).map(&:state)
   end

   def start_and_end_dates
      contests.pluck("MIN(date), MAX(date)").flatten
   end

   def candidates_sorted_by_delegate_count
      self.candidates.select("candidates.*, SUM(results.delegate_count) as delegate_count").joins(:results).joins("INNER JOIN contests ON results.contest_id = contests.id").where("contests.election_id = ?", self.id).group("1").order("delegate_count DESC")
   end


end
