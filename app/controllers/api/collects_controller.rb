module Api
	class CollectsController
		def create
			@collect = Collect.new(collects_params)

			if @collect.save
				render json: @collect
			else
				render json: @collect.errors.full_messages, status: 422
			end
		end

		def destroy
			@collect = Collect.find(params[:id])
			@collect.destroy
			render json: {}
		end

		private
			def collects_params
				params.permit(:collection_id, :book_id)
			end
	end
end