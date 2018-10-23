module Api
  module V1
    class BoardsController < ApplicationController
      before_action :set_board, except: [:index, :create]

      # GET /boards
      def index
        @boards = Board.all
        render json: @boards
      end

      # POST /boards
      def create
        @board = Board.new(board_params)

        if @board.save
          render json: @board, status: :created
        else
          render json: @board.errors, status: :unprocessable_entity
        end
      end

      # GET /boards/1
      def show
        render json: @board
      end

      # PATCH/PUT /boards/1
      def update
        if @board.update(board_params)
          render json: @board
        else
          render json: @board.errors, status: :unprocessable_entity
        end
      end

      # DELETE /companies/1
      def destroy
        @board.destroy
      end

      private

      def set_board
        @board = Board.find(params[:id])
      end

      def board_params
        params.require(:board).permit(
          :title
        )
      end
    end
  end
end
