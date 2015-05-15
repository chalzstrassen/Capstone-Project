class ChangeCollectsCountDefault < ActiveRecord::Migration
  def change
    change_column :collections, :collects_count, :integer, default: 0
  end
end
