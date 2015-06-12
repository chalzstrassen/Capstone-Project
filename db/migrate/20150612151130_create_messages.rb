class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
    	t.string :body, null: false
    	t.integer :from_id, null: false
    	t.integer :to_id, null: false

    	t.timestamp
    end

    add_index :messages, :from_id
    add_index :messages, :to_id
  end
end
