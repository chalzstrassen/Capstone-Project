class Collect < ActiveRecord::Base
  belongs_to :collection, counter_cache: true
  belongs_to :book
end
