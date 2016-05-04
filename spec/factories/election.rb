FactoryGirl.define do
   factory :election do

      

      name "General Elections"
      affiliation "none"
      process_type "general"
      sequence(:year) { |n| (2000 + n) }
      candidates {[create(:male_candidate), create(:female_candidate), create(:candidate, first_name: "Poo", last_name: "Bear")]}
      
      factory :election_with_contests do
         transient do
            state_array []
            amount 10
            delegate_start 10
         end
         after(:create) do |election, evaluator| 
            evaluator.state_array.empty? ?  evaluator.amount.times { |i| create(:contest, election: election, number_delegates: evaluator.delegate_start + i) } :
               evaluator.state_array.each_with_index { |state, i| create(:contest, state: create(:state, name: state[0], symbol: state[1]), election: election, number_delegates: evaluator.delegate_start + i) }
         end
      end

      factory :election_with_contests_and_results do

         after(:create) do |election, evaluator|
               create(:contest, election: election, state: create(:state, :new_york))
               create(:contest, election: election, state: create(:state, :new_jersey))
               create(:contest, election: election, state: create(:state, name: "Pensylvania", symbol: "PA"))
               create(:contest, election: election, state: create(:state, name: "Oregon", symbol: "OR"))

               create(:result, candidate: election.candidates[0], delegate_count: 100, contest: election.contests[0])
               create(:result, candidate: election.candidates[1], delegate_count: 200, contest: election.contests[0])
               create(:result, candidate: election.candidates[2], delegate_count: 150, contest: election.contests[0])
            
               create(:result, candidate: election.candidates[0], delegate_count: 150, contest: election.contests[1])
               create(:result, candidate: election.candidates[1], delegate_count: 100, contest: election.contests[1])
               create(:result, candidate: election.candidates[2], delegate_count: 75, contest: election.contests[1])
         end
         
      end



   end
end