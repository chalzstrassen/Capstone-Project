class Collection < ActiveRecord::Base
  validates :user_id, :name, :description, presence: true

  belongs_to :user
end
