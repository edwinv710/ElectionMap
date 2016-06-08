class Result < ApplicationRecord

   validates :candidate_id, presence: true, uniqueness: {scope: [:contest_id, :delegate_type]}
   validates :delegate_count, presence: true
   validates :contest_id, presence: true
   validates :delegate_type, presence: true

   belongs_to :contest
   belongs_to :candidate

   scope :pledged, -> {where(delegate_type: "pledged")}
   scope :super, -> {where(delegate_type: "super")}

   def self.total_delegate_count
      self.sum(:delegate_count)
   end

   def self.pledged_delegate_count
      self.pledged.sum(:delegate_count)
   end

   def self.super_delegate_count
      self.super.sum(:delegate_count)
   end

   def self.by_candidate(candidate_id)
      self.where(candidate_id: candidate_id)
   end

   def self.contest_ids
      self.pluck(:contest_id)
   end

   def to_builder
      Jbuilder.new do |result|
         result.candidateId candidate_id
         result.delegateCount delegate_count
         result.delegateType delegate_type
      end
   end

end
