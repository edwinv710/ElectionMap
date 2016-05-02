# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'


CSV.foreach('states.csv', headers: true ) do |row|
  row = row.to_hash
  state = State.create(name: row[:name], symbol: row[:symbol])
  gen_contest = Contest.create(state_id: state.id, date: row[:gen_date], contest_type: "general", number_delegates: row[:gen_delegates])
  rep_contest = Contest.create(state_id: state.id, date: row[:rep_date], contest_type: "republican_primary", number_delegates: row[:rep_delegates])
  dem_contest = Contest.create(state_id: state.id, date: row[:dem_date], contest_type: "democrat_primary", number_delegates: row[:dem_pledged_delegates])
end

CVS.foreach('candidates.csv', headers: true ) do |row|
  row = row.to_hash
  candidate = Candidate.create(first_name: row[:first_name], last_name: row[:last_name], affiliation: row[:affiliation], status: row[:status])
end
