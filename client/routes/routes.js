if(Meteor.isClient){
    Accounts.onLogin(function(){
        FlowRouter.go('profile')
    });
    Accounts.onLogout(function(){
        FlowRouter.go('signup');
    });
};


FlowRouter.route('/',{
    name : "signup",
    action: function(){
        BlazeLayout.render('SignUp');
    }
});

FlowRouter.route('/profile',{
    name : "profile",
    action: function(){
        BlazeLayout.render('Profile');
    }
});

FlowRouter.route('/home',{
    name : "home",
    action: function(){
        BlazeLayout.render('Home');
    }
});

FlowRouter.route('/message',{
    name : "message",
    action: function(){
        BlazeLayout.render('Message');
    }
});

FlowRouter.route('/books',{
    name: "books",
    action: function(){
        BlazeLayout.render('Books');
    }
});

FlowRouter.route('/addProfile',{
    name : "add-profile",
    action: function(){
        BlazeLayout.render('AddProfile');
    }
});

FlowRouter.route('/editProfile',{
    name : "edit-profile",
    action: function(){
        BlazeLayout.render('EditProfile');
    }
});

FlowRouter.route('/addBooks',{
    name : "add-books",
    action: function(){
        BlazeLayout.render('AddBooks');
    }
});

FlowRouter.route('/book/:id',{
    name : "book-detail",
    action : function(){
        BlazeLayout.render('BookDetail')
    }
});

FlowRouter.route('/user/:username',{
    name: "user-profile",
    action : function(){
        BlazeLayout.render('UserProfile');
    }
})