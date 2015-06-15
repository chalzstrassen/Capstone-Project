class BooksController < ApplicationController
	before_action :require_signed_in!, only: [:comment, :like, :unlike]
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

	def like
    @book = Book.find(params[:id])
    @like = @book.likes.new(liker_id: current_user.id)
    if @like.save
      flash[:notice] = "You have liked this profile."
    else
      flash[:notice] = "Cannot like this profile."
    end
    redirect_to book_url(@book)
  end

  def unlike
    @book = Book.find(params[:id])
    if @book.liked_by?(current_user)
      @like = @book.likes.find_by(liker_id: current_user.id)
      flash[:notice] = "You have unliked this profile."
      @like.destroy
      redirect_to book_url(@book)
    end
  end

	private
		def comment_params
      		params.require(:comment).permit(:body)
    	end
end