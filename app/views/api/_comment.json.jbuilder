json.(comment, :body, :id)
json.commenter do
	json.partial!("api/users/user", author: commenter)
end