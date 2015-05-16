json.(@collection, :name, :description)

json.book_count @collection.collects_count
json.user @collection.user.email
json.books do
	json.array! @collection.books do |book|
		json.title book.title
		json.author book.author.email
	end
end

