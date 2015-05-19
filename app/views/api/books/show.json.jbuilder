json.(@book, :title, :genre, :synopsis, :created_at, :id)
json.image_url asset_path(@book.cover.url(:original));
json.author do
  json.email_address @book.author.email
end
