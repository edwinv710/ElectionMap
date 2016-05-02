class State < ApplicationRecord

   validates :name,   presence: true, uniqueness: true
   validates :symbol, presence: true, uniqueness: true

   has_many :contests
   has_many :states

end
