json.(@book, :title, :genre, :synopsis, :created_at, :id, :likes_count)
json.image_url asset_path(@book.cover.url(:original));
json.content_url asset_path(@book.content.url(:original))
json.pdf_thumb asset_path(@book.content.url(:thumbnail))
json.author do
	json.partial!("api/users/user", author: @book.author)
end
json.comments do
	json.array!(@comments) do |comment|
	  json.partial!('api/comment', comment: comment, commenter: comment.commenter)
	end
end