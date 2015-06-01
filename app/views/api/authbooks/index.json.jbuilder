json._page @books.current_page
json._totalPages @books.total_pages

json.paginated do
	json.array! @books do |book|
	  json.title book.title
	  json.published book.created_at
	  json.id book.id
	end
end
