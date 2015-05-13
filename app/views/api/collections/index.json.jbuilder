json.array! @collections do |collection|
  json.(collection, :name, :collects_count)
end
