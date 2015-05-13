module Api
	class ApiController < ApplicationController
    	before_action :require_signed_in!

    	def require_signed_in!
    		unless logged_in?
    			render json: ["You must be signed in to view this API!"], status: :unauthorized
    		end
    	end
    end
end
