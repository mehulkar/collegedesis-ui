namespace :app do
  desc "Precompile assets, commit changes, and deploy"
  task :deploy do
    `RAILS_ENV=production RACK_ENV=production rake assets:precompile`
    `git add . && git commit -m "precompile assets"`
    `git push heroku master`
  end
end

