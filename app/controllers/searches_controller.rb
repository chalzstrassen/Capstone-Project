class SearchesController < ApplicationController
	def index
		@filters = params[:filter] || []
		@query = params[:query]
		if @filters.length > 0
			genre_filtered = Book.where(genre: @filters)
			@search_results = genre_filtered.search_on_title_synopsis(@query)
											.page(params[:page])
		else
			@search_results = Book.search_on_title_synopsis(@query)
								  .page(params[:page])
		end
			
		render :index
	end
end