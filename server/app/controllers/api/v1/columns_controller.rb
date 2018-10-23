module Api
  module V1
    class ColumnsController < ApplicationController
      before_action :set_column, except: [:index, :create]

      # GET /columns?board=1
      def index
        board = Board.find(board_id)

        if board.present?
          render json: board.columns
        else
          render json: { message: 'Board not found' }, status: :not_found
        end
      end

      # POST /columns
      def create
        @column = Column.create(column_params)

        if @column.save
          render json: @column, status: :created
        else
          render json: @column.errors, status: :unprocessable_entity
        end
      end

      # GET /columns/1
      def show
        render json: @column
      end

      # PATCH/PUT /tasks/1
      def update
        if @column.update(column_params)
          render json: @column
        else
          render json: @column.errors, status: :unprocessable_entity
        end
      end

      # DELETE /columns/1
      def destroy
        @column.destroy
      end

      private

      def set_column
        @column = Column.find(params[:id])
      end

      def board_id
        params[:board]
      end

      def column_params
        params.require(:column).permit(
          :title,
          :position,
          :board_id
        )
      end
    end
  end
end
