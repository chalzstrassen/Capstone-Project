Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
  	resources :books, only: [:index, :create, :show, :destroy, :update]
    resources :authbooks, only: [:index]
  	resources :collections, except: [:new, :edit]
  	resources :collects, only: [:create, :destroy]
    resources :user_searches, only: [:index]
  end

  get "search", to: "searches#index"
end
