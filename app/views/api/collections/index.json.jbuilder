json.paginated do
	json.array! @collections do |collection|
	  json.(collection,:id, :name, :collects_count)
	end
end