Template.UserProfile.onCreated(function(){
    var self = this;
    self.autorun(function(){
        var username = FlowRouter.getParam('username');
        self.subscribe('userprofile', username);
        self.subscribe('profile');
    });
});

Template.UserProfile.helpers({
    user : ()=>{
        var id = FlowRouter.getParam('username');
        return this.Profile.findOne({namep : id});
    }
});

Template.UserProfile.events({
    'click .addFriends' : function(e){
        var id = FlowRouter.getParam('username');
        // return this.Profile.findOne({namep : id});
        var friend = Profile.findOne({namep : id});
        var user = Profile.findOne({author: Meteor.userId()});
        // console.log();
        Meteor.call('addFriend', user._id, friend.namep);
    }
});