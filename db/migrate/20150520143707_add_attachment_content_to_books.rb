class AddAttachmentContentToBooks < ActiveRecord::Migration
  def self.up
    change_table :books do |t|
      t.attachment :content
    end
  end

  def self.down
    remove_attachment :books, :content
  end
end
