class UsersController < ApplicationController
  before_action :require_signed_in!, only: [:edit]

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
    @auth_books = @user.authored_books
    @collections = @user.collections
    render :show
  end

  def edit
    @user = User.find(params[:id])
    render :edit
  end

  private
    def user_params
      params.require(:user).permit(:email, :password)
    end
end
