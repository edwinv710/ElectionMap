# FactoryGirl.define do
#    factory :democratic_primary_election, class: :election do
#       name "Democratic Primary"
#       affiliation "none"
#       process_type "general"
#       year 2016
#       delegates_needed 2384
#       total_super_delegates 715
#       candidates {[
#          create(:candidate, 
#             first_name: "Bernie", 
#             last_name: "Sanders", 
#             image_url: "http://res.cloudinary.com/dqacnk0ea/image/upload/c_scale,w_400/c_crop,h_400,w_400,x_0,y_5/electionmap/img/Bernie_Sanders.jpg", 
#             banner_url: "http://res.cloudinary.com/dqacnk0ea/image/upload/c_scale,w_600/electionmap/img/Bernie-Banner-Blue-For-President-Official-updated.png", 
#             website_url: "www.berniesanders.com",
#             description: "Senator of Vermont",
#             status: "active"
#             ),
#          create(:candidate, 
#             first_name: "Hillary", 
#             last_name: "Clinton", 
#             image_url: "http://res.cloudinary.com/dqacnk0ea/image/upload/c_scale,w_400/c_crop,h_400,r_0,w_400,y_10/electionmap/img/Hillary_Clinton_official_Secretary_of_State_portrait_crop.jpg", 
#             banner_url: "http://res.cloudinary.com/dqacnk0ea/image/upload/c_scale,w_600/electionmap/img/1200px-H4A.png",
#             website_url: "www.hillaryclinton.com",
#             description: "Fmr. Secretary of States",
#             status: "active"
#             ),
#          create(:candidate,
#             first_name: "Martin",
#             last_name: "O'Malley",
#             image_url: "http://res.cloudinary.com/dqacnk0ea/image/upload/c_scale,w_400/c_crop,h_400,w_400,y_0/electionmap/img/Martin-OMalley.jpg",
#             banner_url: "http://res.cloudinary.com/dqacnk0ea/image/upload/c_pad,h_369,w_600/electionmap/img/o-malley-for-president-2016-_6922.jpg",
#             website_url: "www.martinomalley.com",
#             description: "61st Governor of Maryland",
#             status: "inactive",
#             last_competitive_date: "02/02/2016"
#             )
#          ]}

#       transient do
#          states [['Alabama','AL'],['Alaska','AK'],['American Samoa','AS'],['Arizona','AZ'],['Arkansas','AR'],['California','CA'],['Colorado','CO'],['Connecticut','CT'],['Delaware','DE'],['Democrats Abroad','DA'],['Washington DC','DC'],['Florida','FL'],['Georgia','GA'],['Guam','GU'],['Hawaii','HI'],['Idaho','ID'],['Illinois','IL'],['Indiana','IN'],['Iowa','IA'],['Kansas','KS'],['Kentucky','KY'],['Louisiana','LA'],['Maine','ME'],['Maryland','MD'],['Massachusetts','MA'],['Michigan','MI'],['Minnesota','MN'],['Mississippi','MS'],['Missouri','MO'],['Montana','MT'],['Nebraska','NE'],['Nevada','NV'],['New Hampshire','NH'],['New Jersey','NJ'],['New Mexico','NM'],['New York','NY'],['North Carolina','NC'],['North Dakota','ND'],['Northern Marianas','NMA'],['Ohio','OH'],['Oklahoma','OK'],['Oregon','OR'],['Pennsylvania','PA'],['Puerto Rico','PR'],['Rhode Island','RI'],['South Carolina','SC'],['South Dakota','SD'],['Tennessee','TN'],['Texas','TX'],['Utah','UT'],['Vermont','VT'],['Virgin Islands','VI'],['Virginia','VA'],['Washington','WA'],['West Virginia','WV'],['Wisconsin','WI'],['Wyoming','WY']]

#          delegates [53,16,6,75,32,475,66,55,21,13,25,214,102,7,25,23,156,83,44,33,55,51,25,95,91,130,77,36,71,21,25,35,24,126,34,247,107,18,6,143,38,61,189,60,24,53,20,67,222,33,16,7,95,101,29,86,14]

#          dates ['03/01/2016','03/26/2016','03/01/2016','03/22/2016','03/01/2016','06/07/2016','03/01/2016','04/26/2016','04/26/2016','03/01/2016','06/14/2016','03/15/2016','03/01/2016','05/07/2016','03/26/2016','03/22/2016','03/15/2016','05/03/2016','02/01/2016','03/05/2016','05/17/2016','03/05/2016','03/06/2016','04/26/2016','03/01/2016','03/08/2016','03/01/2016','03/08/2016','03/15/2016','06/07/2016','03/05/2016','02/20/2016','02/09/2016','06/07/2016','06/07/2016','04/19/2016','03/15/2016','06/07/2016','03/12/2016','03/15/2016','03/01/2016','05/17/2016','04/26/2016','06/05/2016','04/26/2016','02/27/2016','06/07/2016','03/01/2016','03/01/2016','03/22/2016','03/01/2016','06/04/2016','03/01/2016','03/26/2016','05/10/2016','04/05/2016','04/09/2016']
#          type ['primary',  'caucus',   'caucus',  'primary',  'primary',  'primary',  'caucus',   'primary',  'primary',  'caucus',   'primary',  'primary',  'primary',  'caucus',   'caucus',   'caucus',   'primary',  'primary',  'caucus',   'caucus',   'primary',  'primary',  'caucus',   'primary',  'primary',  'primary',  'caucus',   'primary',  'primary',  'primary',  'caucus',   'caucus',   'primary',  'primary',  'primary',  'primary',  'primary',  'caucus',   'caucus',   'primary',  'primary',  'primary',  'primary',  'caucus',   'primary',  'primary',  'primary',  'primary',  'primary',  'caucus',   'primary',  'caucus',   'primary',  'caucus',   'primary',  'primary',  'caucus']

#          contest_delegates_candidate_1 [9, 13, 2, 33, 10, nil, 41, 27, 9, 9,nil, 73, 29, 3, 17, 18, 77, 44, 21, 23, nil, 14, 16, 34, 45, 67, 46, 4, 35, nil, 15, 15, 15, nil, nil, 108, 47, nil, 2, 62, 21, nil, 83, nil, 13, 14, nil, 23, 75, 27, 16, nil, 33, 74, nil, 48, 7]
#          contest_delegates_candidate_2  [44, 3, 4, 42, 22, nil, 25, 28, 12, 4, nil, 141, 73, 4, 8, 5, 79, 39, 23, 10, nil, 37, 9, 61, 46, 63, 31, 32, 36, nil, 10, 20, 9, nil, nil, 139, 60, nil, 4, 81, 17, nil, 106, nil, 11, 39, nil, 44, 147, 6, 0, nil, 62, 27, nil, 38, 7]
#          contest_delegates_candidate_3  [44, 3, 4, 42, 22, nil, 25, 28, 12, 4, nil, 141, 73, 4, 8, 5, 79, 39, 23, 10, nil, 37, 9, 61, 46, 63, 31, 32, 36, nil, 10, 20, 9, nil, nil, 139, 60, nil, 4, 81, 17, nil, 106, nil, 11, 39, nil, 44, 147, 6, 0, nil, 62, 27, nil, 38, 7].map{|val| 0}
      
#          contest_super_delegates_candidate_1  [0,   1, 1, 2, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 3, 2, 0, 0, 0, 1, 0, 2, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 6, 1, 0, 0, 1, 1, 0]
#          contest_super_delegates_candidate_2  [4,  1, 4, 5, 5, 52,   9, 15,   7, 2, 21,   23,   11,   5, 6, 1, 22,   7, 7, 1, 2, 7, 3, 16,   16,   10,   12,   3, 13,   0, 3, 4, 6, 9, 6, 40,   8, 1, 5, 14,   1, 6, 21,   3, 9, 5, 1, 5, 20,   2, 3, 1, 13,   10,   4, 6, 4]
#          contest_super_delegates_candidate_3  [44, 3, 4, 42, 22, nil, 25, 28, 12, 4, nil, 141, 73, 4, 8, 5, 79, 39, 23, 10, nil, 37, 9, 61, 46, 63, 31, 32, 36, nil, 10, 20, 9, nil, nil, 139, 60, nil, 4, 81, 17, nil, 106, nil, 11, 39, nil, 44, 147, 6, 0, nil, 62, 27, nil, 38, 7].map{|val| 0}
      
#          rules  ['all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all',   'proportional',   'all']
#       end

#       proportional

#       after(:create) do |election, evaluator|
#          evaluator.states.each_with_index do  |state, i|
#             dateArray = evaluator.dates[i].split('/')
#             d =  DateTime.new(dateArray[2].to_i, dateArray[0].to_i, dateArray[1].to_i) 
#             s = create(:state, name: state[0], symbol: state[1])
#             c = create(:contest, election: election, state: s, number_delegates: evaluator.delegates[i], date: d, contest_type: evaluator.type[i], rule: evaluator.rules[i])
#             unless (evaluator.contest_delegates_candidate_1[i].nil? ||  evaluator.contest_delegates_candidate_2[i].nil?)
#                create(:result, candidate_id: election.candidates[0].id, delegate_type: "pledged", delegate_count: evaluator.contest_delegates_candidate_1[i], contest: c)
#                create(:result, candidate_id: election.candidates[1].id, delegate_type: "pledged", delegate_count: evaluator.contest_delegates_candidate_2[i], contest: c)
#                create(:result, candidate_id: election.candidates[2].id, delegate_type: "pledged", delegate_count: evaluator.contest_delegates_candidate_3[i], contest: c)
#                create(:result, candidate_id: election.candidates[0].id, delegate_type: "super", delegate_count: evaluator.contest_super_delegates_candidate_1[i], contest: c)
#                create(:result, candidate_id: election.candidates[1].id, delegate_type: "super", delegate_count: evaluator.contest_super_delegates_candidate_2[i], contest: c)
#                create(:result, candidate_id: election.candidates[2].id, delegate_type: "super", delegate_count: evaluator.contest_super_delegates_candidate_3[i], contest: c)
#             end
#          end
#       end
#    end
#    factory :election do
#       name "General Elections"
#       affiliation "none"
#       process_type "general"
#       sequence(:year) { |n| (2000 + n) }

#       factory :election_with_contests do
#          transient do
#             state_array []
#             amount 10
#             delegate_start 10
#          end
#          after(:create) do |election, evaluator| 
#             evaluator.state_array.empty? ?  evaluator.amount.times { |i| create(:contest, election: election, number_delegates: evaluator.delegate_start + i) } :
#                evaluator.state_array.each_with_index { |state, i| create(:contest, state: create(:state, name: state[0], symbol: state[1]), election: election, number_delegates: evaluator.delegate_start + i) }
#          end
#       end

#       factory :election_with_contests_and_results do

#          transient do
#             male_candidate_image {nil}
#             female_candidate_image {nil}
#             other_candidate_image {nil}
#          end

#          after(:create) do |election, evaluator|
#                election.candidates << create(:male_candidate, image_url: evaluator.male_candidate_image)
#                election.candidates << create(:female_candidate, image_url: evaluator.female_candidate_image)
#                election.candidates << create(:candidate, first_name: "Poo", last_name: "Bear", image_url: evaluator.other_candidate_image)
               
#                create(:contest, election: election, state: create(:state, :new_york))
#                create(:contest, election: election, state: create(:state, :new_jersey))
#                create(:contest, election: election, state: create(:state, name: "Pensylvania", symbol: "PA"))
#                create(:contest, election: election, state: create(:state, name: "Oregon", symbol: "OR"))

#                create(:result, candidate: election.candidates[0], delegate_count: 100, contest: election.contests[0])
#                create(:result, candidate: election.candidates[1], delegate_count: 200, contest: election.contests[0])
#                create(:result, candidate: election.candidates[2], delegate_count: 150, contest: election.contests[0])
            
#                create(:result, candidate: election.candidates[0], delegate_count: 150, contest: election.contests[1])
#                create(:result, candidate: election.candidates[1], delegate_count: 100, contest: election.contests[1])
#                create(:result, candidate: election.candidates[2], delegate_count: 75, contest: election.contests[1])
#          end
         
#       end     
#    end
# end