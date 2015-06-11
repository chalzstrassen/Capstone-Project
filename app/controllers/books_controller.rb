class BooksController < ApplicationController
	def show
		@book = Book.find(params[:id])
		if logged_in?
			user_collections = current_user.collections
			@collections = user_collections.select { |collection| !collection.books.include?(@book) }
		end

		render :show		
	end
end