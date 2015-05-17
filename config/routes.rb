Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
  	resources :books, only: [:index, :create, :show]
    resources :authbooks, only: [:index, :create, :show]
  	resources :collections, except: [:new, :edit]
  	resources :collects, only: [:create, :destroy]
  end
end
