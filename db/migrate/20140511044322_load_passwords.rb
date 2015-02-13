class LoadPasswords < ActiveRecord::Migration
  def up
	@usernames = ['beebs', 'pheezy', 'micky', 'Prez', 'Ho', 'john']
	User.reset_column_information
	(0..5).each do |user|
	    newp = User.find_by(:login => @usernames[user])
	    newp.password=(@usernames[user])
	    newp.save(:validate => false)
	end
  end
end
