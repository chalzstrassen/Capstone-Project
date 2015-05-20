class Book < ActiveRecord::Base
  validates :author_id, :title, :genre, :synopsis, presence: true
  has_attached_file :cover, default_url: "default.png", storage: :s3
  validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/
  belongs_to(:author,
            class_name: "User",
            foreign_key: :author_id,
            primary_key: :id,
            )

  
end
