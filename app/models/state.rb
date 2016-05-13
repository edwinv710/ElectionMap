class State < ApplicationRecord

   validates :name,   presence: true, uniqueness: true
   validates :symbol, presence: true, uniqueness: true

   has_many :contests
   has_many :states

   def to_builder
      Jbuilder.new do |state|
         state.name name
         state.symbol symbol
      end
   end

   def self.find_all_by_contests(contests)
      self.joins(:contests).where(contests: {id: contests.pluck(:id)})
   end

end
