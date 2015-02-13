class UsersController < ApplicationController
  def new()
    @user = User.new
  end
      
  # puts all users from database to an object
  def index()
    @usr_names = User.all
  end

  # puts photos and comments for a specific user from database to an object 
  def show()
    # user determined by users/:id from 1 to n
    @photos_and_comments = Array.new
    @curr_user = User.find_by_id(params[:id])
    if @curr_user != nil then
    	for photo in @curr_user.photos do
		comments = Array.new
		for comment in photo.comments do
		  comments << comment
		end
		@photos_and_comments << {:photo => photo, :comments => comments}
	end
    else
      render :partial => "users/error", :locals => {:text => "Oops! we couldn't find that user for you."}
    end
    # fill usr_names with the users if we did not use the home page to get here
    if @usr_names == nil then
	    index()
    end
  end

  def destroy()
    reset_session
    @user = nil
    redirect_to login_users_path
  end

  def post_login()
    @user = User.find_by login: params[:login]
    if @user == nil then
      flash.now[:lognotice] = "Could not login with the username " + params[:login]
      render login_users_path
    elsif(@user.password_valid?(params[:password])) then
      session[:user_id] = @user[:id]
      redirect_to user_path(session[:user_id])
    else
      flash.now[:passnotice] = "Could not match the password " + params[:password]
      render login_users_path
    end
  end

  def create()
    @user = User.find_by login: params[:login]
    if(params[:login] != params[:logcheck]) then
      flash.now[:lognotice] = "Your usernames do not match. Please use identical usernames."
      render new_user_path
    elsif(params[:password] != params[:passcheck]) then
      flash.now[:passnotice] = "Your passwords do not match. Please use identical passwords."
      render new_user_path
    elsif @user != nil then
      flash.now[:lognotice] = "The username " + params[:login] + " has already been taken!"
      render new_user_path
    else
      @user = User.new(:first_name => params[:first_name].to_s,
		       :last_name => params[:last_name].to_s,
		       :login => params[:login].to_s)
      @user.password=(params[:password].to_s)
      if @user.save then      
        redirect_to login_users_path
      else
        render new_user_path
      end
    end
  end
end
