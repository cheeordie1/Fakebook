class TagsController < ApplicationController
	def new()
		if(!session[:user_id]) then
			render :partial => "users/error", :locals => {:text => "Please log in before you tag a photo"}
		end
		@tag = Tag.new
		if !(Photo.find_by_id(params[:photo_id])) then
			render :partial => "users/error", :locals => {:text => "Oops! We couldn't find that Photo for you."}
		end
		@option_str = ""
		User.find_each do |user|
			@option_str += "<option value='" + user.first_name + " " + user.last_name + "'></option>"
        	end
	end

	def create()
		if(!session[:user_id]) then
			render :partial => "users/error", :locals => {:text => "Please log in before you tag a photo"}
		end
		@tag = Tag.new(:user_id => params[:tag][:user_id],
			       :photo_id => params[:photo_id],
			       :tag_x => params[:tag_x],
			       :tag_y => params[:tag_y],
			       :size_x => params[:size_x],
			       :size_y => params[:size_y]);
		if !( Photo.find_by_id(params[:photo_id])) then
			render :partial => "users/error", :locals => {:text => "Oops! We couldn't find that Photo for you."}
		end
		if @tag.save(:validate => false) then
			redirect_to user_path(@tag.photo.user[:id])
		else
			render :action => :new
		end
	end
end
