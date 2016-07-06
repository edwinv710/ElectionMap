# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160705010538) do

  create_table "candidates", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "party_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "affiliation"
    t.integer  "status"
    t.string   "image_url"
    t.string   "banner_url"
    t.string   "description"
    t.string   "website_url"
    t.datetime "last_competitive_date"
    t.boolean  "is_shown",              default: true
  end

  create_table "candidates_elections", id: false, force: :cascade do |t|
    t.integer "candidate_id"
    t.integer "election_id"
    t.index ["candidate_id"], name: "index_candidates_elections_on_candidate_id"
    t.index ["election_id"], name: "index_candidates_elections_on_election_id"
  end

  create_table "contests", force: :cascade do |t|
    t.integer  "state_id"
    t.datetime "date"
    t.integer  "map_id"
    t.string   "contest_type"
    t.integer  "number_delegates"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "election_id"
    t.string   "rule"
  end

  create_table "contests_elections", id: false, force: :cascade do |t|
    t.integer "contest_id"
    t.integer "election_id"
    t.index ["contest_id"], name: "index_contests_elections_on_contest_id"
    t.index ["election_id"], name: "index_contests_elections_on_election_id"
  end

  create_table "elections", force: :cascade do |t|
    t.string   "name"
    t.string   "affiliation"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "process_type"
    t.integer  "year"
    t.boolean  "is_active",             default: true
    t.integer  "delegates_needed"
    t.string   "description"
    t.string   "website_url"
    t.integer  "total_super_delegates"
    t.index ["name"], name: "index_elections_on_name"
  end

  create_table "maps", force: :cascade do |t|
    t.string   "type"
    t.integer  "year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "results", force: :cascade do |t|
    t.integer  "map_id"
    t.integer  "state_id"
    t.integer  "candidate_id"
    t.integer  "delegate_count"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "contest_id"
    t.string   "delegate_type"
  end

  create_table "states", force: :cascade do |t|
    t.string   "name"
    t.string   "symbol"
    t.integer  "republican_pledged_delegates"
    t.integer  "democrat_pledged_delegates"
    t.integer  "democrat_super_delegates"
    t.integer  "general_delegates"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

end
