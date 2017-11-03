Books = new Mongo.Collection('books');

Books.allow({
    insert: function(userId, doc){
        return !!userId;
    },
    update : function(userId, doc){
        return !!userId;
    }
});

Reviews = new SimpleSchema({
    user : {
        type : String,
        label: "User name",
        autoform : {
            type : "hidden"
        }
    },
    comment : {
        type : "String",
        label : "Review"
    }
});

BooksSchema = new SimpleSchema({
    name : {
        type : "String",
        label : "Book Name"
    },
    image : {
        type : "String",
        label : "Image URL"  
    },
    desc : {
        type : "String",
        label : "Book Description"
    },
    author : {
        type : "String",
        label : "Author"
    },
    genre : {
        type: String,
        label: "Genre",
        allowedValues: ['mystery', 'romance', 'thriller', 'comedy', 'sciFi', 'others'],
        autoform: {
          options: {
            mystery: "Mystery",
            romance: "Romance",
            thriller: "Thriller",
            comedy: "Comedy",
            sciFi : "Sci-fi",
            others : "Others"
          }
        }
    },
    rate :{
        type : "Number",
        label : "Rate"
    },
    review : {
        type: [Reviews],
        optional : true
    },
    count : {
        type : "Number",
        label : "Count",
        // autoValue : function(){
        //     return "1"
        // },
        defaultValue: 0,
        autoform : {
            type : "hidden"
        }
    }
});

Books.attachSchema(BooksSchema);

Meteor.methods({
    rateBooks: function(id, newrate, newcount){
        Books.update(id,{
            $set : {
                rate : newrate,
                count : newcount
            }
        });
    },
    addReview : function(id, name, newComment){
        Books.update(id,{
            $push :{
                review : {
                    user : name,
                    comment : newComment
                }
            }
        });
    }
});