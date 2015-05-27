module Api
	class AvailbooksController < ApiController
		def index
	      collection_books = Collection.find(params[:id]).books
	      avail_books = exclude_authored(current_user.id) - collection_books
	      @books = Kaminari.paginate_array(avail_books).page(params[:page]).per(5)
	  #     exclusion_arr = []
	  #     collection_books.each { |book| exclusion_arr.push(book.id.to_s) }
	  #     params_string = build_string(exclusion_arr)
	  #     @books = Book.find_by_sql(["
			# SELECT books
			# FROM books
			# WHERE books.author_id <> #{current_user.id}
			# AND books.id 
			# NOT IN #{params_string} 	
	  #     ", *exclusion_arr]).page(params[:page]).per(5)

	      render "api/books/index"
    	end

    	# private

    	# 	def build_string(arr)
    	# 		params_arr = Array.new(arr.length, "?")
    	# 		"(" + params_arr.join(", ") + ")" 
    	# 	end
	end
end