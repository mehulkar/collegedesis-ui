News::Application.routes.draw do
  get '*foo', :to => 'landing#index'
end
