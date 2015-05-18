module Api
  class BooksController < ApiController
    skip_before_action :require_signed_in!, only: [:show, :index]

    def index
      @books = Book.all
      render :index
    end

    # def create
    #   @book = current_user.authored_books.new(book_params)
    #
    #   if @book.save
    #     render json: @book
    #   else
    #     render json: @book.errors.full_messages, status: 422
    #   end
    # end

    def show
      @book = Book.find(params[:id])
      render :show
    end

  private

    def book_params
      params.require(:book).permit(:title, :genre, :synopsis)
    end

  end
end
