class ChangeBodyColumnInMessages < ActiveRecord::Migration
  def change
  	change_column :messages, :body, :text, null: false
  end
end
