# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

  user1 = User.create!(email: "jack@gmail.com", password: "password")
  user2 = User.create!(email: "jill@yahoo.com", password: "coffee")
  user3 = User.create!(email: "guest", password: "password")

  genres = %w(Misc Nonfiction Fiction Photobook Textbook Science)

  book1 = user1.authored_books.create!(
    title: "Beer from Hell",
    genre: "Fiction",
    synopsis: "Tucker goes to hell and becomes a bartender who interacts with other infamous and notorious historical figures. Hilarity ensues."
  )

  book2 = user1.authored_books.create!(
    title: "App Academy Sickness",
    genre: "Nonfiction",
    synopsis: "Real student accounts of incidents not witnessed by their instructors in the office. All very hilarious."
  )

  book3 = user1.authored_books.create!(
    title: "Firetrux",
    genre: "Photobook",
    synopsis: "Follow Firetrux and his friends as they adventure through whereever they want to adventure in. From canyons to rivers, hear more about the travails and exploits of Firetrux."
  )

  collection1 = user2.collections.create!(
    name: "App Academy Recommendations",
    description: "These books are recommended by people from App Academy."
  )

  collection1.add_book(book2)

  # Seed database with users

  10.times do |i|
    User.create!(email: Faker::Internet.email, password: "password")
  end

  50.times do |i|
    author_id = rand(13) + 1
    author = User.find(author_id)
    title = [Faker::Hacker.adjective.capitalize, Faker::Hacker.noun.capitalize].join(" ")
    a = author.authored_books.new(
      title: title,
      genre: genres.sample,
      synopsis: Faker::Hacker.say_something_smart
    )
    a.cover = File.new(::Rails.root.join("app", "assets", "images", "cover", "pic#{i % 27}.jpg"))
    a.content = File.new(::Rails.root.join("app", "assets", "images", "content", "pdf#{i % 24}.pdf"))
    a.save
  end





  

