class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :photo_id
      t.integer :user_id
      t.integer :tag_x
      t.integer :tag_y
      t.integer :size_x
      t.integer :size_y

      t.timestamps
    end
  end
end
