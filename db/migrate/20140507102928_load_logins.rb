class LoadLogins < ActiveRecord::Migration
  def up
    @usernames = ['beebs', 'pheezy', 'micky', 'Prez', 'Ho', 'john']
    @realnames = ["Justin", "Paris", "Miley", "Barack", "Santa", "John"]
    User.reset_column_information
    (0..5).each do |user|
      newu = User.find_by(:first_name => @realnames[user])
      newu.login = @usernames[user]
      newu.save(:validate => false)
    end
  end
end
