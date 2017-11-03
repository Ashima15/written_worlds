Template.Profile.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('profile');
    });
    this.editProfile = new ReactiveVar(false);
    this.newuser = new ReactiveVar(true);
    console.log(this.newuser);  
});

Template.Profile.helpers({
    profile : ()=> {
        return Profile.find({author: Meteor.userId()});
    },
    editProfile : function(){
        return Template.instance().editProfile.get();
    },
    newuser : function(){
        return Template.instance().newuser.get();
    },
    isCreated : ()=> {
        return Profile.find({isCreated : true});
        // console.log(Profile.isCreated);
    }
    
});

Template.Profile.events({
    'click .edit' : function(event, template){
        template.editProfile.set(!template.editProfile.get());
    },
    'click .sumitted ' : function(){
        Meteor.call('toggleMenu', this._id, this.isCreated);
        console.log("events" + this.isCreated);
    }
});