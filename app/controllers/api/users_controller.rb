module Api
	class UsersController < ApiController
		def show
			@user = User.find(params[:id])
			@comments = @user.comments

			render :show
		end

  	def comment
	    @user = User.find(params[:id])
	    @comment = @user.comments_on.new(comment_params)
	    @comment.commenter_id = current_user.id
	    if @comment.save
	      render json: [@comment, current_user]     
	    else
	      render json: @comment.errors.full_messages, status: 422
	    end
	  end

	  def message
	    @user = User.find(params[:id])
	    @message = @user.received_messages.new(message_params)
	    @message.from_id = current_user.id
	    if @message.save
	      render json: @message    
	    else
	      render json: @message.errors.full_messages, status: 422
	    end
	  end

	  def like
	    @user = User.find(params[:id])
	    @like = @user.likes.new(liker_id: current_user.id)
	    if @like.save
	      render json: @like
	    else
	      render json: @like.errors.full_messages, status: 422
	    end
	  end

	  def unlike
	    @user = User.find(params[:id])
	    if current_user.likes?(@user)
	      @like = @user.likes.find_by(liker_id: current_user.id)
	      @like.destroy
	      render json: {}
	    else
	    	render json: "Cannot unlike this user.", status: 422
	    end
	  end

  end
end
