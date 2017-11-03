Posts = new Mongo.Collection('posts');

Posts.allow({
    insert: function(userId, doc){
        return !!userId;
    },
    update : function(userId, doc){
        return !!userId;
    }
});

// Like = new SimpleSchema({
//     names : {
//         type : String,
//         label : "People who liked"
//     }
// });

Comment = new SimpleSchema({
    name : {
        type: String,
        label : "Username"
    },
    comment : {
        type: String,
        label : "Post a comment"
    },
    createdAt : {
        type : Date,
        autoValue : function(){
            return new Date();
        }
    }
});

PostsSchema = new SimpleSchema({
    name : {
        type : String,
        label : "Post By",
        optional: true,
        defaultValue : "Null"
    },
    post : {
        type : String,
        label : "Post"
    },
    like : {
        type : [String],
        optional: true
    },
    comment : {
        type : [Comment],
        optional: true
    },
    likecount : {
        type : Number,
        label : "Like Count",
        defaultValue : 0,
        autoform : {
            type: "hidden"
        }
    },
    commentCount : {
        type : Number,
        label : "Like Count",
        defaultValue : 0,
        autoform : {
            type: "hidden"
        },
        optional: true
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
    createdAt : {
        type: Date,
        autoValue : function(){
            return new Date();
        }
    }
});

Posts.attachSchema(PostsSchema);

Meteor.methods({
    likeCountAdd: function(id, count){
        Posts.update(id,{
            $set : {
                likecount : count
            }
        });
    },
    likeNameAdd : function(id, name){
        Posts.update(id,{
            $push :{
                like : name
            }
        });
    },
    likeNameRemove : function(id, name){
        Posts.update(id,{
            $pull : {
                like : name
            }
        });
    },
    addComment : function(id, name, comment){
        Posts.update(id,{
            $push : {
                comment : {
                    name : name,
                    comment : comment,
                    createdAt : new Date()
                }
            }
        });
    }

});