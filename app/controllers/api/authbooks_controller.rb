module Api
	class AuthbooksController < ApiController
		def index
			@books = current_user.authored_books
      render :index
		end

		def create
      @book = current_user.authored_books.new(book_params)

      if @book.save
        render json: @book
      else
        render json: @book.errors.full_messages, status: 422
      end
    end

		def update
			@book = current_user.authored_books.find_by(params[:id])

			if @book.update(book_params)
				render json: @book
			else
				render json: @book.errors.full_messages, status: 422
			end
		end

		private

			def book_params
	      params.require(:book).permit(:title, :genre, :synopsis)
	    end
	end
end
