Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create, :show, :edit] do
    member do
      post "comment"
    end
  end
  resource :session, only: [:new, :create, :destroy]
  resources :books, only: [:show] do
    member do
      post "comment"
    end
  end
  resources :collects, only: [:create]
  resources :comments, only: [:create, :update, :destroy]

  namespace :api, defaults: { format: :json } do
  	resources :books, only: [:index, :create, :show, :destroy, :update]
    resources :authbooks, only: [:index]
  	resources :collections, except: [:new, :edit]
  	resources :collects, only: [:create, :destroy]
    resources :user_searches, only: [:index]
    resources :availbooks, only: [:index]
  end

  get "search", to: "searches#index"
  get '/auth/:provider/callback', to: 'sessions#omniauth'
end
