class SearchesController < ApplicationController
	def index
		@filters = params[:filter] || []
		@search_condition = params[:search_by]
		@query = params[:query]
		if @filters.length > 0
			genre_filtered = Book.where(genre: @filters)
			@search_results = search_filter(genre_filtered)
		else
			@search_results = search_filter()
		end
			
		render :index
	end

	private

		def search_filter(filtered=Book)
			if @search_condition == "book"
				filtered.search_on_title_synopsis(@query)
						.page(params[:page])
			elsif @search_condition == "author"
				filtered.includes(:author).search_by_author_email(@query)
						.page(params[:page])
			end
		end
end