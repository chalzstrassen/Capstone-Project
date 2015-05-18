json.(@book, :title, :genre, :synopsis, :created_at, :id)

json.author do
  json.email_address @book.author.email
end
