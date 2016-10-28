# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

   
# ActiveRecord::Base.connection.tables.collect{ |table_name| (ActiveRecord::Base.connection.execute("TRUNCATE #{table_name} RESTART IDENTITY") unless ["candidates_elections", "contests_elections"].include?(table_name)) }

elections_json = JSON.parse(File.read("db/files/elections.json"));
democratic_contests_json  = JSON.parse(File.read("db/files/democrat_election_contests.json"));
republican_contests_json  = JSON.parse(File.read("db/files/republican_election_contests.json"));
general_contests_json  = JSON.parse(File.read("db/files/general_election_contests.json"));
states_json  = JSON.parse(File.read("db/files/states.json"));
candidates_json  = JSON.parse(File.read("db/files/candidates.json"));

democratic_results_json = JSON.parse(File.read("db/files/democrat_election_results.json"));
republican_results_json = JSON.parse(File.read("db/files/republican_election_results.json"));

candidates = [];
states = [];

states_json .each do |s|
   states << State.create(name: s["name"],symbol: s["symbol"])
end

candidates_json.each do |c|
   candidates << Candidate.create(first_name: c["first_name"], last_name: c["last_name"], image_url: c["image_url"],
      banner_url: c["banner_url"], website_url: c["website_url"], description: c["description"], status: c["status"], affiliation: c["affiliation"], is_shown: (c["is_shown"] ? !c["is_shown"].zero? : true) )
end


elections_json.each do |e|
   election = Election.create(name: e["name"], affiliation: e["affiliation"], process_type: e["process_type"], 
      year: e["year"], delegates_needed: e["delegates_needed"], total_super_delegates: e["total_super_delegates"])

   e["candidates"].each do |c|
      election.candidates << candidates[c - 1]
   end

   case election.name
   when "Democratic Primary"
      
      democratic_contests_json.each do |dc|
         c = Contest.create(election: election, state: states[dc["state_id"]-1], number_delegates: dc["number_delegates"], date: Date.strptime(dc["date"], '%m/%d/%Y'), contest_type: dc["contest_type"], rule: (dc["rule"].to_s.size > 3 ? dc["rule"] : "proportional"))
      end
   when "Republican Primary"
      republican_contests_json.each do |dc|
         Contest.create(election: election, state: states[dc["state_id"]-1], number_delegates: dc["number_delegates"], date: Date.strptime(dc["date"], '%m/%d/%Y'), contest_type: dc["contest_type"], rule: dc["rule"].to_s.size > 3 ? dc["rule"] : "proportional")
      end
   when "General Election"
      general_contests_json.each do |dc|
         Contest.create(election: election, state: states[dc["state_id"]-1], number_delegates: dc["number_delegates"], date: Date.strptime(dc["date"], '%m/%d/%Y'), contest_type: dc["contest_type"], rule: dc["rule"].to_s.size > 3 ? dc["rule"] : "proportional")
      end
   end
end

democratic_results_json.each do |r|
   Result.create(contest_id: r["contest_id"], candidate_id: r["candidate_id"], delegate_count: r["pledged_delegates_count"], delegate_type: "pledged") if r["pledged_delegates_count"] > 0
end

republican_results_json.each do |r|
   Result.create(contest_id: r["contest_id"], candidate_id: r["candidate_id"], delegate_count: r["pledged_delegates_count"], delegate_type: "pledged") if r["pledged_delegates_count"] > 0
end


