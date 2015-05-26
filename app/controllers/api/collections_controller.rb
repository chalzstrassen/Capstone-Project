module Api
  class CollectionsController < ApiController
    def index
      @collections = current_user.collections
                                 .page(params[:page])
                                 .per(4)
      render :index
    end

    def show
      @collection = current_user.collections.find(params[:id])
      @books = @collection.books.page(params[:page]).per(5)
      render :show
    end

    def create
      @collection = current_user.collections.new(collection_params)

      if @collection.save
        render json: @collection
      else
        render json: @collection.errors.full_messages, status: 422
      end
    end

    def destroy
      @collection = Collection.find(params[:id])
      @collection.destroy
      render json: {}
    end

    def update
      @collection = current_user.collections.find(params[:id])
      if @collection.update(collection_params)
        render json: @collection
      else
        render json: @collection.errors.full_messages, status: 422
      end
    end

    private
      def collection_params
        params.require(:collection).permit(:name, :description)
      end

  end
end
