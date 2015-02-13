function ajaxSearch(method, searchURL, handler){
  xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = handler;
  xmlRequest.open(method, searchURL, true);
  xmlRequest.send();
};

function Searchbar(bar_id, list_id){
  this.input_bar = document.getElementById(bar_id);
  this.list = document.getElementById(list_id);
  var obj = this;
  this.input_bar.addEventListener("keyup", function(evt){
    obj.deleteList();
    if(obj.input_bar.value == "") return;
    ajaxSearch("GET", "/photos?str=" + encodeURIComponent(obj.input_bar.value), function(){
      if(xmlRequest.readyState != 4){
        return;
      }
      if(xmlRequest.status != 304 && xmlRequest.status != 200){
        // handle errors?
        return;
      }
      // handle the data returned by the controller
      var photoData = JSON.parse(xmlRequest.responseText);
      for (var currPhoto = 0; currPhoto < photoData.photos.length; currPhoto++){
        obj.listNewPhoto(photoData.photos[currPhoto].url,
	       	photoData.photos[currPhoto].photo_name,
	       	photoData.photos[currPhoto].username,
		photoData.photos[currPhoto].user_url);
      }
    });
  });
}

Searchbar.prototype.listNewPhoto = function(url, photo_name, username, user_url){
  var currPhotoRow = this.list.insertRow();
  currPhotoRow.className = "searchbar";
  var currPhotoData = currPhotoRow.insertCell();
  currPhotoData.className = "searchlistrow relative";
  var currPhoto = currPhotoData.appendChild(document.createElement("A"));
  currPhoto.href = user_url + "#" + photo_name;
  currPhoto.style.backgroundImage = "url('" + url + "#" + photo_name + "')";
  currPhoto.style.backgroundSize = "50px 50px";
  currPhoto.className = "thumbnail";
  var link = currPhotoData.appendChild(document.createElement("A"));
  link.innerHTML = "Go to " + username + "'s photo " + photo_name;
  link.className = "link absolute";
  link.href = user_url + "#" + photo_name;
  currPhoto.addEventListener("mouseover", function(){
    currPhoto.className = "thumbnail highlighted";
  });
  currPhoto.addEventListener("mouseout", function(){
    currPhoto.className = "thumbnail";	  
  });
};

Searchbar.prototype.deleteList = function(){
  while(this.list.rows.length != 0){
    this.list.deleteRow(0);
  }
};
