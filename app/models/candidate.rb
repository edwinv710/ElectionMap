class Candidate < ApplicationRecord

   enum status: [ :active, :inactive ]

   validates :first_name, presence: true
   validates :last_name, presence: true
   validates :affiliation, presence: true
   validates :status, presence: true

   has_many :results


   # def delegate_count(election_id)
   #    results.joins(:contest).where("contests.election_id = ?", election_id).total_delegate_count
   # end

   def full_name
      "#{first_name} #{last_name}"
   end


   def contest_ids
      results.contest_ids
   end

   def self.include_delegate_count
      self.select("candidates.*, SUM(results.delegate_count) as delegate_count").joins(:results).group("1")
   end

   def self.participating_in_election(election_id)
      self.joins(:results).joins("INNER JOIN contests ON results.contest_id = contests.id").where("contests.election_id = ?", election_id)
   end

   def is_active
      status or "active"
   end

   def super_delegate_count
      self.results.super_delegate_count
   end

   def pledged_delegate_count
      self.results.pledged_delegate_count
   end


   def to_builder 
      Jbuilder.new do |candidate|
         candidate.id id
         candidate.firstName first_name
         candidate.lastName last_name
         candidate.affiliation affiliation
         candidate.status is_active
         candidate.contestIds contest_ids
         candidate.imageUrl image_url
         candidate.bannerUrl banner_url
         candidate.websiteUrl website_url
         candidate.description description
         candidate.delegateCount (respond_to?(:delegate_count) ? delegate_count : nil)
         candidate.lastCompetitiveDate last_competitive_date
         candidate.superDelegateCount super_delegate_count
         candidate.pledgedDelegateCount pledged_delegate_count
      end
   end
end
