class BooksController < ApplicationController
	before_action :require_signed_in!, only: [:comment]
	def show
		@book = Book.find(params[:id])
		if logged_in?
			user_collections = current_user.collections
			@collections = user_collections.select { |collection| !collection.books.include?(@book) }
		end

		render :show		
	end

	def comment
		@book = Book.find(params[:id])
	    @comment = @book.comments.new(comment_params)
	    @comment.commenter_id = current_user.id
	    if @comment.save
	      redirect_to book_url(@book)
	    else
	      flash[:notice] = "Cannot save comment."
	      redirect_to book_url(@book)
	    end
	end

	private
		def comment_params
      		params.require(:comment).permit(:body)
    	end
end