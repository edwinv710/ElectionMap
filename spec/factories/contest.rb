FactoryGirl.define do
   factory :contest do
      state
      date DateTime.new(2016, 3, 2)
      contest_type "caucus"
      sequence(:number_delegates) { |n| (10 + n) }

      trait :with_election do
         election
      end

   end
end