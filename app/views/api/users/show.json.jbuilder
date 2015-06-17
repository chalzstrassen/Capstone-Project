json.(@user, :id, :likes_count, :fname, :lname)
json.comments do
	json.array!(@comments) do |comment|
	  json.partial!('api/comment', comment: comment, commenter: comment.commenter)
	end
end