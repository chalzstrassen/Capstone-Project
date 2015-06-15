class StaticPagesController < ApplicationController
  before_action :require_signed_in!, only: [:root]
  def root; end

  def rankings
  	@books = Book.order(likes_count: :desc, title: :asc).limit(10)
  	@authors = User.order(likes_count: :desc, fname: :asc).limit(10)
  end
end
