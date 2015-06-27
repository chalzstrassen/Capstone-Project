json.(@user, :id, :likes_count, :fname, :lname)
json.comments do
	json.array!(@comments) do |comment|
	  json.partial!('api/comment', comment: comment, commenter: comment.commenter)
	end
end
json.messages do
	json.array! @user.received_messages, :to, :from
end
json.books do
	json.array! @books do |book|
		json.id book.id
		json.title book.title
		json.genre book.genre
		json.likes book.likes_count
		json.coverUrl book.cover.url
	end
end
json.isCurrentUser @user.id == current_user.id
json.isLiked current_user.likes?(@user)