class UsersController < ApplicationController
  # before_action :require_login, only: [:library]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:notice] = "Successfully created your account! Here's your library."
      login!(@user)
      redirect_to @user
    else
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private
    def user_params
      params.require(:user).permit(:email, :password)
    end
end
