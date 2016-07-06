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

# left join contests on contest.election_id = election.id, left join results on results.contest_id = contest.id and results.candidate_id = candidate.id


   def self.include_delegate_count
      # self.select("candidates.*, COALESCE(SUM(results.delegate_count), 0) as delegate_count").joins("LEFT JOIN 'results' ON results.candidate_id = candidates.id").group("1")
   end

   def self.participating_in_election(election_id)
      #self.joins("LEFT JOIN 'results' ON results.candidate_id = candidates.id").joins("LEFT JOIN contests ON results.contest_id = contests.id").where("contests.election_id = ?", election_id)
      # self.select("candidates.*, COALESCE(SUM(results.delegate_count), 0) as delegate_count").joins("LEFT JOIN elections ON elections.id = candidates_elections.election_id").joins("LEFT JOIN contests ON contests.election_id = elections.id").joins("LEFT JOIN results ON results.contest_id = contests.id").where("elections.id = ? AND is_shown = ?", election_id, true).group("1")
      self.select("candidates.*, COALESCE(SUM(results.delegate_count), 0) as delegate_count").joins("LEFT JOIN contests ON contests.election_id = candidates_elections.election_id").joins("LEFT JOIN results ON results.contest_id = contests.id").group("1").where("candidates_elections.election_id = ?", election_id).where(is_shown: true)
      # joins("LEFT JOIN 'results' ON results.candidate_id = candidates.id").joins("INNER JOIN contests ON results.contest_id = contests.id AND elections.contest_id = contest.id").group("1")
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
