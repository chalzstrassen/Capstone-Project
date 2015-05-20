class Book < ActiveRecord::Base
  validates :author_id, :title, :genre, :synopsis, presence: true
  has_attached_file :cover, default_url: "default.png"
  validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/
  has_attached_file :content, styles: { thumbnail: ["100x100#", :png] }, default_url: "/"
  validates_attachment :content, content_type: { content_type: "application/pdf" }

  belongs_to(:author,
            class_name: "User",
            foreign_key: :author_id,
            primary_key: :id,
            )

end
