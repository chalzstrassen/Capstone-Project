class Like < ActiveRecord::Base
	validates :likable_id, uniqueness: { scope: [:liker_id, :likable_type] }
	
	belongs_to :likable, polymorphic: true, counter_cache: true
	belongs_to(:liker,
			   class_name: "User",
			   foreign_key: :liker_id,
			   primary_key: :id,
			   )
end
