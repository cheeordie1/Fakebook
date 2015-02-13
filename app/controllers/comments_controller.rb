class CommentsController < ApplicationController
	def new()
		@comment = Comment.new
		if !(Photo.find_by_id(params[:photo_id])) then
			render :partial => "users/error", :locals => {:text => "Oops! We couldn't find that Photo for you."}
		end
	end

	def create()
		@comment = Comment.new(:photo_id => params[:photo_id],
				       :user_id => params[:user_id],
				       :date_time => params[:date_time],
				       :comment => params[:comment])
		if @comment.save(:validate => true) then
			redirect_to user_path(@comment.photo.user[:id])
		else
			render :action => :new
		end
	end
end
