# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

  user1 = User.create!(email: "jack@gmail.com", password: "password")
  user2 = User.create!(email: "jill@yahoo.com", password: "coffee")

  book1 = user1.authored_books.create!(
    title: "Beer from Hell",
    genre: "Fiction",
    synopsis: "Tucker goes to hell and becomes a bartender who interacts with other infamous and notorious historical figures. Hilarity ensues.")

  book2 = user1.authored_books.create!(
    title: "App Academy Sickness",
    genre: "Nonfiction",
    synopsis: "Real student accounts of incidents not witnessed by their instructors in the office. All very hilarious.")
