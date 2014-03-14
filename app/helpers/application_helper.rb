module ApplicationHelper
  def last_build
    timestamp = Time.parse(ENV['LAST_BUILD']) || Time.now
    str = timestamp.strftime("%m-%e-%y-%H:%M")
    return str
  end
end
