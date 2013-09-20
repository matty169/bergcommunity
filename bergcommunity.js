Improvements = new Meteor.Collection("improvements");
Likes = new Meteor.Collection("likes");
Suggestions = new Meteor.Collection("suggestions");


if (Meteor.isClient) {

  Template.likes.events({
      'click input.btnVoteLike': function() {
	  Likes.update(this._id,{$inc: {vote: 1}});
      }
  });

  Template.likes.events({
      'click input#addLike': function(){
	  var name = document.getElementById('txtLike');
	  if(name.value != ''){
	      Likes.insert({
		  name: name.value,
		  vote: 0,
		  time: Date.now()
	      });
	  }
	  name.value = '';
      }
  });

  Template.likes.likes = function(){
	return Likes.find({}, {sort: {vote: -1, name: 1}});
  };

  Template.suggestion.events({
      'click input.btnCommentSuggestion': function(){
	  var comment = document.getElementById(this._id);
	  if(comment.value != ''){
	      Suggestions.update(
		  {_id: this._id},
		  {$addToSet: {comments: {body: comment.value, time: Date.now()}}}
	      )
	  }
	  comment.value = '';
      }
  });

  Template.suggestions.events({
      'click input#addSuggestion' : function(){
	  var body = document.getElementById('txtSuggestion');
	  if(body.value != ''){
	      Suggestions.insert({
		  body: body.value,
		  vote: 0,
		  time: Date.now()
	      });
	  }
	  body.value = '';
      }
  });

  Template.suggestions.suggestions = function(){
      return Suggestions.find({},{sort: {time: 1}});
  };

  Template.improvement.events({
      'click input.btnVoteImprovement': function() {
	  Improvements.update(this._id,{$inc: {vote: 1}});
      }
  });

  Template.improvements.events({
      'click input#addImprovement': function(){
	  var name = document.getElementById('txtImprovement');
	  if(name.value != ''){
	      Improvements.insert({
		  name: name.value,
		  vote: 0,
		  time: Date.now()
	      });
	  }
	  name.value = '';
      }
  });

  Template.improvements.improvements = function(){
	return Improvements.find({}, {sort: {vote: -1, name: 1}});
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
      if (Improvements.find().count === 0) {
	  var names = ["Security Cameras",
		      "Improved Guards",
		      "Blog",
		      "Panic buttons"];
	  for (var i=0; i< names.length; i++)
	      Improvements.insert({name: names[i]});
      }
  });
}
