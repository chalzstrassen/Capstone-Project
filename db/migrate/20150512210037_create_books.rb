class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.integer :author_id, null: false
      t.string :title, null: false
      t.string :genre, null: false
      t.text :synopsis, null: false

      t.timestamps null: false
    end

    add_index :books, [:id, :author_id], unique: true
  end
end
