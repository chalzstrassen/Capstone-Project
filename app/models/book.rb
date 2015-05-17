class Book < ActiveRecord::Base
  validates :author_id, :title, :genre, :synopsis, presence: true
  # validates :genre,   // Will need to decide what
  # authors can select as genre or whether book can have
  # multiple genres.

  belongs_to(:author,
            class_name: "User",
            foreign_key: :author_id,
            primary_key: :id,
            )

  
end
