FactoryGirl.define do

   factory :state do
      sequence(:name)   { |n| "State#{n}" }
      sequence(:symbol) { |n| "s#{n}" }

      trait :new_york do
         name "New York"
         symbol "NY"
      end

      trait :new_jersey do
         name "New Jersey"
         symbol "NJ"
      end
   end
end