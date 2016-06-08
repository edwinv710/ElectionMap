# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'factory_girl_rails'

Election.destroy_all
Candidate.destroy_all
Contest.destroy_all
Map.destroy_all
Result.destroy_all
State.destroy_all

FactoryGirl.create(:democratic_primary_election)

