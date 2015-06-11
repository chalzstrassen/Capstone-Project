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

  def comment
    @user = User.find(params[:id])
    @comment = @user.comments_on.new(comment_params)
    @comment.commenter_id = current_user.id
    if @comment.save
      redirect_to user_url(@user)
    else
      flash[:notice] = "Cannot save comment."
      redirect_to user_url(@user)
    end
  end

  private
    def user_params
      params.require(:user).permit(:email, :password)
    end

    def comment_params
      params.require(:comment).permit(:body)
    end
end
