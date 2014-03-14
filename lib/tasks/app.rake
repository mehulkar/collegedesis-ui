namespace :app do
  desc "Precompile assets, commit changes, and deploy"
  task :deploy, :force do |t, args|
    puts "WARNING: Removing currently precompiled assets"
    `git rm -rf public/assets/*`

    timestamp = Time.now
    puts "INFO: Setting LAST_BUILD to #{timestamp}"
    %x(heroku config:set LAST_BUILD='#{timestamp}')

    puts "INFO: Precompiling assets and commiting them to git"
    `RAILS_ENV=production RACK_ENV=production rake assets:precompile`
    `git add public/assets/ && git commit -m "precompile assets for deploy"`

    if args[:force]
      puts "WARNING: Force pushing to Heroku"
    else
      puts "INFO: Pushing to Heroku"
    end
    push_cmd = "git push heroku master"
    push_cmd += " -f" if args[:force]

    puts "INFO: Running \`#{push_cmd}\`"
    `#{push_cmd}`
  end
end
