json.(@book, :title, :genre, :synopsis, :created_at, :id)
json.image_url asset_path(@book.cover.url(:original));
json.content_url asset_path(@book.content.url(:original))
json.pdf_thumb asset_path(@book.content.url(:thumbnail))
json.author do
  json.email_address @book.author.email
end
