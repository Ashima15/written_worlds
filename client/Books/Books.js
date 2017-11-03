Template.Books.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('books');
    });
    self.autorun(function(){
        self.subscribe('profile');
    });
});

Template.Books.events({
    'click .addBooks' : function(){
        FlowRouter.go('/addBooks');
    }
});

Template.Books.helpers({
    profile: ()=> {
        return Profile.find({});
    },
    mystery : ()=> {
        return Books.find({genre : "mystery"});
    },
    romance : ()=> {
        return Books.find({genre : "romance"});
    },
    comedy : ()=> {
        return Books.find({genre : "comedy"});
    },
    sciFi : ()=> {
        return Books.find({genre : "sci-fi"});
    },
    thriller : ()=> {
        return Books.find({genre : "thriller"});
    },
    others : ()=> {
        return Books.find({genre : "others"});
    }
});

// book-detail
Template.BookDetail.onCreated(function(){
    var self = this;
    self.autorun(function(){
        self.subscribe('profile');
    });
    self.autorun(function(){
        var id = FlowRouter.getParam('id');
        self.subscribe('bookDetail', id);
    });
});

Template.BookDetail.helpers({
    book : ()=>{
        var id = FlowRouter.getParam('id');
        return this.Books.findOne({_id : id});
    },
    profile: ()=> {
        return Profile.find({});
    }
  
});

Template.BookDetail.events({
    'click .rate-books' : function(){
        console.log();
        var id = FlowRouter.getParam('id');
        var book = Books.findOne({_id: id});
        var newcount = Number(book.count + 1);
        var temp = Number(book.rate * book.count);
        var newrate = Number((temp+ 5)/newcount);
        Meteor.call('rateBooks', book._id, newrate , newcount);
    },
    'click .submit-review' : function(){
        var id = FlowRouter.getParam('id');
        var book = Books.findOne({_id: id});
        var profile = Profile.findOne({author : Meteor.userId()});
        var newComment = document.getElementById('review').value;
        document.getElementById('review').value = " ";
        console.log(profile.namep);
        Meteor.call('addReview', book._id, profile.namep, newComment);
    }
});