Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create, :show, :edit, :update] do
    member do
      post "comment"
      post "message"
      post "like"
      delete "unlike"
    end
  end
  resource :session, only: [:new, :create, :destroy]
  resources :books, only: [:show] do
    member do
      post "comment"
      post "like"
      delete "unlike"
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

  get "rankings", to: "static_pages#rankings"
  get "search", to: "searches#index"
  get '/auth/:provider/callback', to: 'sessions#omniauth'
end
