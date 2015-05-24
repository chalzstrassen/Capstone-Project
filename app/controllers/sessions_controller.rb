class SessionsController < ApplicationController
  def new
    if logged_in?
      redirect_to user_url(current_user)
    end
  end

  def create
    user = User.find_by_credentials(
                params[:user][:email],
                params[:user][:password]
                )

    if user
      user.reset_session_token!
      login!(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["User cannot be found."]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end

  def omniauth
    puts auth_hash
    user = User.find_or_create_by_auth_hash(auth_hash)
    login!(user)
    redirect_to root_url
  end

  private

    def auth_hash
      request.env["omniauth.auth"]
    end
end
