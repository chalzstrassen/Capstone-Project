module Api
  class BooksController < ApiController
    skip_before_action :require_signed_in!, only: [:show, :index]
    wrap_parameters false

    def index
      if logged_in?
        @books = exclude_authored(current_user.id)
                     .page(params[:page])
                     .per(5)
      else
        @books = Book.includes(:author).page(params[:page]).per(5)
      end
      
      render :index
    end

    def comment
      @book = Book.find(params[:id])
      @comment = @book.comments.new(body: params[:body])
      @comment.commenter_id = current_user.id
      if @comment.save
        render json: {fname: current_user.fname}
      else
        render json: "Cannot save comment."
      end
    end

    def create
      @book = current_user.authored_books.new(book_params)
    
      if @book.save
        render json: @book
      else
        render json: @book.errors.full_messages, status: 422
      end
    end

    def show
      @book = Book.find(params[:id])
      @comments = @book.comments
      
      render :show
    end

    def destroy
      @book = Book.find(params[:id])
      
      if @book.author_id == current_user.id
        if @book.destroy
          render json: {}
        else
          render json: @book.errors.full_messages, status: 422
        end
      else
        render json: "You did not write this book."
      end
    end

    def update
      @book = Book.find(params[:id])

      if @book.author_id == current_user.id
        if @book.update(book_params)
          render json: @book
        else
          render json: @book.errors.full_messages, status: 422
        end
      end
    end

    def like
      @book = Book.find(params[:id])
      @like = @book.likes.new(liker_id: current_user.id)
      if @like.save
        render json: @like
      else
        render json: @like.errors.full_messages, status: 422
      end
    end

    def unlike
      @book = Book.find(params[:id])
      if @book.liked_by?(current_user)
        @like = @book.likes.find_by(liker_id: current_user.id)
        @like.destroy
        render json: {}
      end
    end

  private

    def book_params
      params.require(:book).permit(:title, :genre, :synopsis, :cover, :content)
    end

    def comment_params
      params.require(:comment).permit(:body)
    end

  end
end
