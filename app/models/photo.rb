class Photo < ActiveRecord::Base
  belongs_to :user
  has_many :comments
  has_many :tags
  validates :file_name, :format => { :with => /(.png|(.jpg|.gif))\z/, :message => "You must upload a .jpeg or .png or .gif file only."}, presence: true
end
