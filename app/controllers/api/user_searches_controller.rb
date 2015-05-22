class Api::UserSearchesController < ApplicationController
	def index
		current_collection = Collection.find(params[:id])
		@books = current_collection
							.books
							.search_on_title_synopsis(params[:query])
							.page(params[:page])

		render "api/books/index"
	end

end