class CreateComments < ActiveRecord::Migration

  def change
    create_table :comments do |comment|
      comment.integer  :photo_id
      comment.integer  :user_id
      comment.datetime :date_time
      comment.text     :comment

      comment.timestamps
    end
  end
end
