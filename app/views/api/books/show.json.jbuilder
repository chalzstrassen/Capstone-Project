json.(@book, :title, :genre, :synopsis, :created_at)

json.author do
  json.email_address @book.author.email
end
