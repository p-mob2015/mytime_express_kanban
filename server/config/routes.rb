Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :boards
      resources :columns
      resources :tasks
    end
  end
end
