class CollectsController < ApplicationController
	def create
		@collect = Collect.new(collects_params)
		@book = Book.find(params[:collect][:book_id])
		user_collections = current_user.collections
		@collections = user_collections.select { |collection| !collection.books.include?(@book) }
		if @collect.save
			flash[:notice] = "Book has been added to collection."
			redirect_to book_url(@book)
		else
			flash.now[:errors] = @collect.errors.full_messages
			render "books/show"
		end
	end

	private
		def collects_params
			params.require(:collect).permit(:collection_id, :book_id)
		end
end