class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
    	t.integer :liker_id, null: false
    	t.integer :likable_id, null: false
    	t.string :likable_type, null: false

    	t.timestamps
    end

    add_index :likes, :liker_id
    add_index :likes, :likable_id
    add_index :likes, [:liker_id, :likable_type, :likable_id], unique: true
  end
end
