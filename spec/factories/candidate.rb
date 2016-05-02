FactoryGirl.define do
   factory :candidate do
      sequence(:first_name) { |n| "John#{n}" }
      sequence(:last_name) { |n| "Doe#{n}" }
      affiliation "independant"
      status "active"

      factory :female_candidate do
         first_name "Jane"
         last_name "Doe"
      end

      factory :male_candidate do
         first_name "John"
         last_name "Doe"
      end

      trait :inactive_candidate do 
         status "inactive"
      end
   end
end