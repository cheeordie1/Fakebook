function Tagger(photo_id, feedback_id, x_id, y_id, width_id, height_id, select_id){
  this.photo = document.getElementById(photo_id);
  this.feedback = document.getElementById(feedback_id);
  this.updateX = document.getElementById(x_id);
  this.updateY = document.getElementById(y_id);
  this.updateWidth = document.getElementById(width_id);
  this.updateHeight = document.getElementById(height_id);
  var obj = this; 
  this.photo.addEventListener("mousedown", function(evt){
    evt.stopPropagation();
    obj.tag = new Tag(photo_id, feedback_id, evt.offsetX, evt.offsetY, 0, 0, obj);
    obj.updateParams();
    obj.tag.resizing = true;
    if(obj.feedback.className.search("tag") == -1){
      obj.feedback.className += " tag";
    }
    if(document.getElementById(select_id)){
	  document.getElementById(select_id).className = "select absolute";
    }
    obj.tag.mouseDown(evt);
  });
}

Tagger.prototype.updateParams = function(){
  this.updateX.value = this.feedback.offsetLeft;
  this.updateY.value = this.feedback.offsetTop;
  this.updateWidth.value = this.feedback.scrollWidth;
  this.updateHeight.value = this.feedback.scrollHeight;
};

function Tag(photo_id, feedback_id, tag_x, tag_y, width, height, parent_tagger){
  this.isMouseDown = false;
  this.parent_photo = document.getElementById(photo_id);
  this.tag_frame = document.getElementById(feedback_id);
  this.tag_frame.style.left = tag_x + "px";
  this.tag_frame.style.top = tag_y + "px";
  this.tag_frame.style.width = width + "px";
  this.tag_frame.style.height = height + "px";
  this.tag_x = tag_x;
  this.tag_y = tag_y;
  this.size_x = tag_x;
  this.size_y = tag_y;
  this.first_name = null;
  this.last_name = null;
  this.parent_tagger = parent_tagger;
  var obj = this;
  if(this.parent_tagger){
    this.tag_frame.onmousedown = function(evt){
      evt.stopPropagation(); // prevent photo from creating new tag
      obj.mouseDown(evt);
    };
  } else {
    obj.tag_frame.onmousedown=null;
    obj.tag_frame.onmouseover=function(evt){
      obj.hoverTag();
    };
    obj.tag_frame.onmouseout=function(evt){
      obj.unhoverTag();
    };
  }
}

Tag.prototype.mouseDown = function(event){
  var obj = this;
  this.oldMoveHandler = document.body.onmousemove;
  document.body.onmousemove = function(event) {
    event.preventDefault();
    if(obj.resizing){
      obj.resizeTag(event);
    } else {
      obj.dragTag(event);
    }
  };
  this.oldUpHandler = document.body.onmouseup;
  document.body.onmouseup = function(event) {
    event.preventDefault();
    obj.mouseUp(event);
  };
  if(!this.resizing){
    this.tag_x = event.clientX;
    this.tag_y = event.clientY;
  }else{ 
    this.size_x = event.clientX;
    this.size_y = event.clientY;
  }
  this.isMouseDown = true;
};

Tag.prototype.dragTag = function(event) {
  if (!this.isMouseDown) {
    return;
  }
  var checkHorBound = this.tag_frame.offsetWidth + (event.clientX - this.tag_x) + this.tag_frame.offsetLeft;
  if(checkHorBound > this.tag_frame.offsetParent.offsetWidth){
    this.tag_frame.style.left = (this.tag_frame.offsetParent.offsetWidth - this.tag_frame.offsetWidth) + "px";
  } else if(checkHorBound < this.tag_frame.offsetWidth){
    this.tag_frame.style.left = 0 + "px";
  } else {
    this.tag_frame.style.left = (checkHorBound - this.tag_frame.offsetWidth) + "px";
  }
  var checkVertBound = this.tag_frame.offsetHeight + (event.clientY - this.tag_y) + this.tag_frame.offsetTop;
  if(checkVertBound > this.tag_frame.offsetParent.offsetHeight){
    this.tag_frame.style.top = (this.tag_frame.offsetParent.offsetHeight - this.tag_frame.offsetHeight) + "px";
  } else if(checkVertBound < this.tag_frame.offsetHeight){
    this.tag_frame.style.top = 0 + "px";
  } else {
    this.tag_frame.style.top = (checkVertBound - this.tag_frame.offsetHeight) + "px";
  }
  this.tag_x = event.clientX;
  this.tag_y = event.clientY;
};

Tag.prototype.resizeTag = function(event){
  if (!this.isMouseDown) {
    return;
  }
  var correctX = 0;
  var correctY = 0;
  var checkHorBound = this.tag_frame.offsetWidth + (event.clientX - this.size_x) + this.tag_frame.offsetLeft;
  if(checkHorBound > this.tag_frame.offsetParent.offsetWidth){
    correctX = this.tag_frame.offsetParent.offsetWidth - checkHorBound;
  } else if(this.tag_frame.offsetLeft < 0){
    correctX = 0 - this.tag_frame.offsetLeft;
  }
  this.tag_frame.style.width = this.tag_frame.scrollWidth + (event.clientX - this.size_x) + correctX + "px";
  var checkVertBound = this.tag_frame.offsetHeight + (event.clientY - this.size_y) + this.tag_frame.offsetTop;
  if(checkVertBound > this.tag_frame.offsetParent.offsetHeight){
     correctY = this.tag_frame.offsetParent.offsetHeight - checkVertBound;
  }else if(this.tag_frame.offsetTop < 0){
    correctY = 0 - this.tag_frame.offsetTop;
  }
  this.tag_frame.style.height = this.tag_frame.scrollHeight + (event.clientY - this.size_y) + correctY + "px";
  this.size_x = event.clientX;
  this.size_y = event.clientY;
};

Tag.prototype.mouseUp = function(event) {
  this.isMouseDown = false;
  this.resizing = false;
  document.body.onmousemove = this.oldMoveHandler;
  document.body.onmouseup = this.oldUpHandler;
  this.parent_tagger.updateParams();
};

Tag.prototype.hoverTag = function(){
  this.label = this.tag_frame.appendChild(document.createElement("TABLE"));
  this.label.className = "wide label tabletobot";
  this.label_row = this.label.insertRow();
  this.label_data = this.label_row.insertCell();
  this.label_data.innerHTML = this.first_name + " " + this.last_name;
  this.label_data; 
};

Tag.prototype.unhoverTag = function(){
  this.tag_frame.removeChild(this.label);
};
