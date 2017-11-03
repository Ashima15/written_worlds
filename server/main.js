import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  ChatRooms.allow({
    'insert':function(userId,doc){
        return true;
    },
    'update':function(userId,doc,fieldNames, modifier){
        return true;
    },
    'remove':function(userId,doc){
        return true;
    }
  });

  Meteor.methods({
    clearchat: function (userId){
    // alert("deleting");
    console.log("deleting");
    ChatRooms.remove({chatIds:[userId , Meteor.userId()]});
    console.log("deleted");
    }
  });

});

// Accounts.onCreateUser(function(options, user){
//   Hooks.onCreateUser = function(){
//     Meteor.Router.to('/addProfile');
//   }
// })