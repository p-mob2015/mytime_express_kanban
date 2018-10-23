module Api
  module V1
    class TasksController < ApplicationController
      before_action :set_task, except: [:index, :create]

      # GET /tasks?board=1
      def index
        board = Board.find(board_id)

        if board.present?
          render json: board.tasks
        else
          render json: { message: 'Board not found' }, status: :not_found
        end
      end

      # POST /tasks
      def create
        @task = Task.create(task_params)

        if @task.save
          render json: @task, status: :created
        else
          render json: @task.errors, status: :unprocessable_entity
        end
      end

      # GET /tasks/1
      def show
        render json: @task
      end

      # PATCH/PUT /tasks/1
      def update
        if @task.update(task_params)
          render json: @task
        else
          render json: @task.errors, status: :unprocessable_entity
        end
      end

      # DELETE /tasks/1
      def destroy
        @task.destroy
      end

      private

      def set_task
        @task = Task.find(params[:id])
      end

      def board_id
        params[:board]
      end

      def task_params
        params.require(:task).permit(
          :title,
          :position,
          :column_id
        )
      end
    end
  end
end
