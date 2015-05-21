class Api::SearchesController < ApplicationController
	skip_before_action :require_signed_in! , only: [:index]

	def index
		@search_results = Book.search_by_title(params[:query])
		render :index
	end
end