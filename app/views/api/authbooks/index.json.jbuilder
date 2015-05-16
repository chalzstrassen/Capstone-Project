json.array! @books do |book|
  json.title book.title
  json.published book.created_at
end