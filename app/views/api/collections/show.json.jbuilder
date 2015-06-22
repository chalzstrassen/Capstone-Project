json.(@collection, :name, :description)

json.book_count @collection.collects_count
json.user @collection.user.email
json.books do
	json.array! @books do |book|
		json.title book.title
		json.author_email book.author.email
		json.author_name book.author.fname + " " + book.author.lname
		json.id book.id
	end
end
