Template.AddPosts.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('posts');
        self.subscribe('profile');
    });
});

Template.AddPosts.events({
    // 'click .SubmitInsertPost' : function(){
    //     var profile = Profile.findOne({author : Meteor.userId()});
    //     var post = Posts.findOne({name : "Null"});
    //     // console.log(profile.namep);
    //     // console.log(post);
    //     Meteor.call('addName', post._id, profile.namep);
    // }
});


// Show Own Posts

Template.OwnPosts.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('posts');
    });
});

Template.OwnPosts.helpers({
    posts : ()=>{
        return Posts.find({author: Meteor.userId()});
    },
    postCreator : ()=> {
        var profile = Profile.findOne({author : Meteor.userId()});
        return profile.namep;
    }
});


// Show All Posts

Template.AllPosts.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('posts');
        // self.subscribe('profile');
    });
});

Template.AllPosts.helpers({
    posts : ()=>{
        // var me = Profile.findOne({author: Meteor.userId()});
        // // console.log(me.friends);
        // var  friends = me.friends;
        // var showPosts = Profile.find({namep: friends});
        // console.log(showPosts);
        // var something = showPosts.author;
        // return Posts.find({author: something});
        // console.log(something);
        return Posts.find({});
    },
    postCreator : (id)=> {
        // console.log(id);
        var post = Posts.findOne({_id : id});
        var profile = Profile.findOne({author : post.author});
        return profile.namep;
        // console.log(this._id);
        // var profile = Profile.findOne({author : Meteor.userId()});
        // return profile.namep;
    }
});

Template.AllPosts.events({
    'click .notLiked' : function(e){
        var count = Number(this.likecount + 1);
        var profile = Profile.findOne({author : Meteor.userId()});
        Meteor.call('likeCountAdd', this._id, count);
        Meteor.call('likeNameAdd', this._id, profile.namep);
        $('#likeButton').removeClass('notLiked');
        $('#likeButton').addClass('remove');
    },
    'click .remove' : function(e){
        var count = Number(this.likecount - 1);
        var profile = Profile.findOne({author : Meteor.userId()});
        Meteor.call('likeCountRemove', this._id,count);
        Meteor.call('likeNameRemove', this._id, profile.namep);
        $('#likeButton').removeClass('remove');
        $('#likeButton').addClass('notLiked');
    },
    'click .add-comment': function(e){
        var profile = Profile.findOne({author : Meteor.userId()});
        var comment = document.getElementById('addComment').value;
        document.getElementById('addComment').value = " ";
        Meteor.call('addComment', this._id, profile.namep, comment);
    },
    'click .fa-close' : function(e){
        // console.log(this);
        // console.log(this._id);
        // Meteor.call('removeComment', this.name, this.comment, this.createdAt)
    }
});