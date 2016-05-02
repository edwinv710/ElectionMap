class Result < ApplicationRecord

   validates :candidate_id, presence: true, uniqueness: {scope: [:contest_id, :delegate_type]}
   validates :delegate_count, presence: true
   validates :contest_id, presence: true
   validates :delegate_type, presence: true

   belongs_to :contest
   belongs_to :candidate

   scope :pledged, -> {where(delegate_type: "pledged")}
   scope :super, -> {where(delegate_type: "pledged")}

   def self.total_delegate_count
      self.sum(:delegate_count)
   end

   def self.by_candidate(candidate_id)
      self.where(candidate_id: candidate_id)
   end

end
