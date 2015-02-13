class Tag < ActiveRecord::Base
  belongs_to :photo
  belongs_to :user
  validates :user_id, :photo_id, :tag_x, :tag_y, :size_x, :size_y, presence: true
  validates :tag_x, :tag_y, :size_x, :size_y, :length => { :minimum => 1 }
end
