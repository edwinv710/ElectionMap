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

   def jObject
      candidates_array = self.candidates.pluck(:id, :first_name, :last_name)
      results = {}
      candidates = {}
      contests.each do |c|
         state = c.state.symbol
         results[state] = {}
         candidates_array.each do |ca|
            candidates[ca[0].to_s] = {"first_name" => ca[1], "last_name" => ca[2]}
            total = c.results.by_candidate(ca[0]).total_delegate_count
            results[state]["#{ca[0]}"] = total
         end
         winner = results[state].max_by{|k, v| v}
         results[state]["winner"] = (winner[1] == 0 ? "-1" : winner[0].to_s)
      end

      return {"name" => self.name, "processType" => self.process_type, "affiliation" => self.affiliation, "candidates" => candidates, "results" => results}
   end  
   

end
