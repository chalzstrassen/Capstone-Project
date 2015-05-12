class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.integer :user_id, null: false
      t.string :name, null: false
      t.text :description, null: false

      t.timestamps null: false
    end

    add_index :collections, [:id, :user_id], unique: true
  end
end
