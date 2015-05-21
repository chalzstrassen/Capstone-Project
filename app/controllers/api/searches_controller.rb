class Api::SearchesController < ApplicationController
	skip_before_action :require_signed_in! , only: [:index]

	def index
		@search_results = Book.search_on_title_synopsis(params[:query])
							  .page(params[:page])
		render :index
	end

	def filter_by_genre
		genre_filtered = Book.where(genre: params[:filter][:genres])
		@search_results = genre_filtered.search_on_title_synopsis(params[:query])
										.page(params[:page])
		render :index
	end
end