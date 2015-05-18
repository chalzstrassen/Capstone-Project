class Collect < ActiveRecord::Base
  validates :collection_id, uniqueness: { scope: :book_id }
  
  belongs_to :collection, counter_cache: true
  belongs_to :book
end
