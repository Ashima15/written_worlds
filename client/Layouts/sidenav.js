Template.SideNavLayout.onRendered(function(){
    Meteor.typeahead.inject();
    // FlowRouter.go('user' , {username : suggestion.value});
});

Template.SideNavLayout.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('allprofile');
    });
});

Template.SideNavLayout.helpers({
    usernames: function() {
        return Profile.find().fetch().map(function(user){ return user.namep; });
    },
    selected: function(event, suggestion, datasetName) {
    // event - the jQuery event object
    // suggestion - the suggestion object
    // datasetName - the name of the dataset the suggestion belongs to
    // TODO your event handler here
    console.log(suggestion.value);
    var param = suggestion.value;
    //FlowRouter.go('/user/suggestion.value');
    FlowRouter.go('/user/' + param);
    } 
});