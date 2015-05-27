module Api
	class ApiController < ApplicationController
    	before_action :require_signed_in!

    	def require_signed_in!
    		unless logged_in?
    			render json: ["You must be signed in to view this API!"], status: :unauthorized
    		end
    	end

    	def exclude_authored(id)
    		Book.includes(:author).where("author_id <> ?", id)
    	end
    end
end
