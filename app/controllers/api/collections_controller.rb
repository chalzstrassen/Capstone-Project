module Api
  class CollectionsController < ApiController
    def index
      @collections = current_user.collections
      render :index
    end

    def show
      @collection = current_user.collections.find(params[:id])
      render :show
    end

    def create

    end

    def destroy

    end

    def update

    end
  end
end
