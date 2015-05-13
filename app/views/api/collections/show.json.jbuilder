json.(@collection, :name, :description)

json.book_count @collection.collects_count
json.user @collection.user.email
