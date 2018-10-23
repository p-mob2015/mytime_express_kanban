class AddPositionToColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :columns, :position, :integer
  end
end
