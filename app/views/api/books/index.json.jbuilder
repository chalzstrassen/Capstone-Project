json._page @books.current_page
json._totalPages @books.total_pages

json.paginated do
	json.array! @books do |book|
	  next if logged_in? && book.author_id == current_user.id

	  json.title book.title
	  json.author_email book.author.email
	  if book.author.fname.blank? || book.author.lname.blank?
	  	json.author_name "Anonymous"
	  else
	  	json.author_name book.author.fname + " " + book.author.lname
	  end
	  json.id book.id
	  json.image_url asset_path(book.cover.url(:original));
	end
end
