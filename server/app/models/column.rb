class Column < ApplicationRecord
  has_many :tasks, dependent: :destroy
  belongs_to :board

  acts_as_list scope: :board
end
