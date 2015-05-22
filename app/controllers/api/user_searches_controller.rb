class Api::UserSearchesController < ApplicationController
	def index
		current_collection = Collection.find(params[:id])
		@search_results = current_collection
							.books
							.search_on_title_synopsis(params[:query])
							.page(params[:page])

		render "api/books/index"
	end

end