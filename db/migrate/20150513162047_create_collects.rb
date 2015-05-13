class CreateCollects < ActiveRecord::Migration
  def change
    create_table :collects do |t|
      t.integer :collection_id, null: false
      t.integer :book_id, null: false

      t.timestamps null: false
    end

    add_column :collections, :collects_count, :integer
  end
end
