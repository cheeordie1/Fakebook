class PhotosController < ApplicationController
	def new()
		@photo = Photo.new
	end

	def create()
		@photo = Photo.new
		if(params[:photo] != nil) then
		  @photo = Photo.new(:file_name => params[:photo][:file_name].original_filename,
				   :user_id => session[:user_id],
				   :date_time => DateTime.now)
		end  
		if @photo.save(:validate => true) then
			# copy file to images
			path = File.join(Rails.root.to_s + "/app/assets/images", @photo[:file_name])
			File.open(path, "wb") { |f| f.write(params[:photo][:file_name].read) }
			redirect_to user_path(@photo.user[:id])
		else
			render :action => :new
		end
	end

	def index()
		if(params[:str] == nil) then
			render :partial => "users/error", :locals => {:text => "Cannot accept query for nil"}
			return
		end
		@send_photos = Array.new()
		Photo.find_each do |photo|
			match = false
			if(photo.user[:first_name].downcase.include?(params[:str].downcase) || photo.user[:last_name].downcase.include?(params[:str].downcase)) then
				match = true
			end
			photo.comments.each do |comment|
				if(comment[:comment].downcase.include?(params[:str].downcase)) then
					match = true
					printf("%s", comment[:comment])
				end
			end
			if(match) then
				@send_photos << {:user_url => user_path(photo.user[:id]),
						 :username => photo.user[:login],
						 :photo_name => photo[:file_name],
		    				 :url => ActionController::Base.helpers.asset_path(photo[:file_name])}
			end
		end
		@data = {:photos => @send_photos}
		# respond with the photos only if the client wants json
		respond_to do |format|
			format.json {render :json => @data.to_json}
			format.html
		end
	end
end
