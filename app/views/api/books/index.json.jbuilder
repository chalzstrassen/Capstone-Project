json._page @books.current_page
json._totalPages @books.total_pages

json.paginated do
	json.array! @books do |book|
	  next if logged_in? && book.author_id == current_user.id

	  json.title book.title
	  json.author_email book.author.email
	  json.id book.id
	  json.image_url asset_path(book.cover.url(:original));
	end
end
