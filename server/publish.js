Meteor.publish("profile", function(){
   return Profile.find({author: this.userId}); 
});
 
Meteor.publish('allusers', function(){
   return Meteor.users.find({});
});

Meteor.publish('books', function(){
   return Books.find({});
});

Meteor.publish('allprofile', function(){
    return Profile.find({});
});

Meteor.publish("bookDetail", function(id){
    check(id, String);
    return Books.find({_id: id}); 
 });

 Meteor.publish("posts", function(){
     return Posts.find({});
 });

 Meteor.publish("userprofile", function(username){
    check(username, String);
    return Profile.find({namep: username}); 
 });

 Meteor.publish("chatrooms",function(){
    return ChatRooms.find({});
});
Meteor.publish("onlusers",function(){
    return Meteor.users.find({"status.online":true},{username:1});
});