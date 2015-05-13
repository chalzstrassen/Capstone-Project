json.array! @books do |book|
  next if logged_in? && book.author_id == current_user.id

  json.title book.title
  json.author_email book.author.email
end
