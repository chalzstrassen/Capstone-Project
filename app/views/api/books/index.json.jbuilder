json.array! @books do |book|
  next if book.author.id == current_user.id

  json.title book.title
  json.author_email book.author.email
end
