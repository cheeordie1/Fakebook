class User < ActiveRecord::Base
  has_many :comments
  has_many :photos
  has_many :tags
  validates :first_name, :presence => true
  validates :last_name, :presence => true
  validates :login, :presence => true
  validates :password_digest, :presence => {:message => ": Password can't be blank"}
  def password=(user_pass)
    if user_pass == nil or user_pass == "" then
      return
    end
    self.salt = SecureRandom.hex(40)
    self.password_digest = Digest::SHA2.new(512).update(user_pass + self.salt).to_s
  end
  def password_valid?(pass_check)
    return Digest::SHA2.new(512).update(pass_check + self.salt).to_s == self.password_digest
  end
end
