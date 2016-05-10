FactoryGirl.define do
   factory :contest do
      state
      date DateTime.new(2016, 3, 2)
      contest_type "caucus"
      sequence(:number_delegates) { |n| (10 + n) }

      trait :with_election do
         election
      end

      factory :ny_democratic_primary do
         contest_type "primary"
         number_delegates 2000
         state {create(:state, :new_york)}
      end

   end
end