class Collection < ActiveRecord::Base
  validates :user_id, :name, :description, presence: true

  belongs_to :user
  has_many :collects, dependent: :destroy
  has_many :books, through: :collects, source: :book

  # pg_search_scope :search_book_in_collection,
  #                 associated_against: { :books => [:title, :synopsis] }

  def add_book(book)
    relation = Collect.new(collection_id: self.id, book_id: book.id)
    relation.save!
  end

  def remove_book(book)
    relation = Collect.where(
      "collection_id = ? AND book_id", self.id, book.id)
    relation.destroy!
  end
end
