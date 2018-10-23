class Board < ApplicationRecord
  has_many :columns, dependent: :destroy
  has_many :tasks, through: :columns

  acts_as_list
end
