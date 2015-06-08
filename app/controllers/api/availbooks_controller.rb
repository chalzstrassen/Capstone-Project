module Api
	class AvailbooksController < ApiController
		def index
	      collection_books = Collection.find(params[:id]).books
	      avail_books = exclude_authored(current_user.id) - collection_books
	      @books = Kaminari.paginate_array(avail_books).page(params[:page]).per(5)

	      render "api/books/index"
    	end
	end
end