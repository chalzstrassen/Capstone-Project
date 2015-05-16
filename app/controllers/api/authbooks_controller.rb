module Api
	class AuthbooksController < ApiController
		def index
			@books = current_user.authored_books
      render :index
		end
	end
end