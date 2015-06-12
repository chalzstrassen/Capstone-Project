class UsersController < ApplicationController
  before_action :require_signed_in!, only: [:edit, :comment]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:notice] = "Successfully created your account! Here's your library."
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def edit
    @user = User.find(params[:id])
    render :edit
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to user_url(@user)
  end

  def comment
    @user = User.find(params[:id])
    @comment = @user.comments_on.new(comment_params)
    @comment.commenter_id = current_user.id
    if @comment.save
      flash[:notice] = "Comment saved."     
    else
      flash[:notice] = "Cannot save comment."
    end
    redirect_to user_url(@user)
  end

  def message
    @user = User.find(params[:id])
    @message = @user.received_messages.new(message_params)
    @message.from_id = current_user.id
    if @message.save
      flash[:notice] = "Message sent."     
    else
      flash[:notice] = "Cannot send message."
    end
    redirect_to user_url(@user)
  end

  private
    def user_params
      params.require(:user).permit(:email, :fname, :lname, :password)
    end

    def comment_params
      params.require(:comment).permit(:body)
    end

    def message_params 
      params.require(:message).permit(:body)
    end
end
