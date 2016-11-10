# omniauth_callbacks_controller.rb
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
	def facebook
		@user = User.find_or_create_by_auth_hash(auth_hash)
		if @user.persisted?
			login! @user
			redirect_to root_url
		else
			cookies[:provider] = auth_hash[:provider]
			cookies[:uid] = auth_hash[:uid]
			cookies[:name] = auth_hash.info.name
			redirect_to auth_email_url
		end
	end

	def failure
		puts auth_hash
		redirect_to root_url
	end

	private
	def auth_hash
		request.env["omniauth.auth"]
	end
end