Profile = new Mongo.Collection('profile');

Profile.allow({
    insert: function(userId, doc){
        return !!userId;
    },
    update : function(userId, doc){
        return !!userId;
    }
});

FeaturedBooks = new SimpleSchema({
    namef : {
        type: String,
        label : "Book name"
    },
    thumbnail : {
        type : String,
        label : "Thumbnail"
        // autoform: {
        //     afFieldInput: {
        //       type: "cfs-file",
        //       collection: "files"
        //     }
        //   }
    }
});

Publications = new SimpleSchema({
    // id : {
    //     type: Number,
    //     label : "ID"
    // },
    namep : {
        type: String,
        label : "Publication Name"
    },
    thumbnail : {
        type : String,
        label : "Publication Thumbnail",
        optional: true
        // autoform: {
        //     afFieldInput: {
        //       type: "cfs-file",
        //       collection: "files"
        //     }
        //   }
    }
});

BooksRead = new SimpleSchema({
    nameb : {
        type : String,
        label : "Book Name"
    },
    thumbnail : {
        type : String,
        label: "Book thumbnail"
        // autoform: {
        //     afFieldInput: {
        //       type: "cfs-file",
        //       collection: "files"
        //     }
        //   }
    }
});

ProfileSchema = new SimpleSchema({
    namep :{
        type: String,
        label : "name",
        defaultValue : this.userName
    },
    displayPhoto:{
        type : String,
        label : "Display Photo"
        // autoform: {
        //     afFieldInput: {
        //       type: "cfs-file",
        //       collection: "files"
        //     }
        //   }
    },
    author : {
        type : String,
        label: "Author",
        autoValue : function(){
            return this.userId
        },
        autoform : {
            type : "hidden"
        }
    },
      
    quote:{
        type: String,
        label : "Quote"
    },
    goal:{
        type : Number,
        label : "Goal",
        defaultValue : "0"
    },
    featuredBooks :{
        type: [FeaturedBooks],
        optional : true
    },
    publications : {
        type : [Publications],
        optional : true
    },
    gender : {
        type: String,
        label: "Gender",
        allowedValues: ['male', 'female'],
        autoform: {
          options: {
            male: "Male",
            female: "Female"
          }
        }
    },
    genre : {
        type : [String],
        label: "Genre"
    },
    booksRated : {
        type: Number,
        label : "No. of books rated",
        defaultValue: "0"
    },
    occupation:{
        type : String,
        label : "Occupation",
        optional : true
    },
    hometown:{
        type: String,
        label : "Home town",
        optional : true
    },
    booksRead:{
        type : [BooksRead]
    },
    totalBooksRead : {
        type : Number,
        label : "Total Books Read"
    },
    isCreated : {
        type : Boolean,
        defaultValue : false,
        autoform:{
            type : "hidden"
        }
    },
    friends : {
        type : [String],
        optional : true,
        autoform:{
            type : "hidden"
        }

    }
});

Profile.attachSchema(ProfileSchema);

Meteor.methods({
    toggleMenu: function(id, currentState){
        Profile.update(id,{
            $set : {
                isCreated : !currentState
            }
        });
    },
    addFriend : function(id, name){
        Profile.update(id,{
            $push : {
                friends : name
            }
        });
    }
});