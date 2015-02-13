class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |photo|
      photo.integer  :user_id
      photo.datetime :date_time
      photo.string   :file_name

      photo.timestamps
    end
  end
end
