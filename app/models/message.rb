class Message < ActiveRecord::Base
	belongs_to(:from,
			   class_name: "User",
			   foreign_key: :from_id,
			   primary_key: :id,
			   inverse_of: :sent_messages
			   )
	belongs_to(:to,
			   class_name: "User",
			   foreign_key: :to_id,
			   primary_key: :id,
			   inverse_of: :received_messages
			   )
end