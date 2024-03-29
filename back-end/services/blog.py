from bson import ObjectId
from database.mongodb import get_db
from datetime import datetime
from services.user import UserService

class BlogService():
    def __init__(self) -> None:
        self.db = get_db()
        self.blogs_collection = self.db['blogs']

    def map_blog(self, blog):
        blog['_id'] = str(blog['_id'])
        if blog['created_at']:
            blog['created_at'] = blog['created_at'].isoformat()
        return blog

    def create_blog(self, blog_data, author_id):
        blog_data["author_id"] = str(author_id)
        blog_data["likes"] = 0
        blog_data["comments"] = []
        blog_data["users_like"] = []
        blog_data["created_at"] = datetime.now()
        print(blog_data)
        result = self.blogs_collection.insert_one(blog_data)
        return self.map_blog(self.blogs_collection.find_one({'_id': result.inserted_id}))

    def add_comment(self, blog_id, comment_data, user_id):
        comment_data["user_id"] = str(user_id)
        comment_data["created_at"] = datetime.now()
        self.blogs_collection.update_one(
            {'_id': ObjectId(blog_id)},
            {'$push': {'comments': comment_data}}
        )
        return self.map_blog(self.blogs_collection.find_one({'_id': ObjectId(blog_id)}))

    def like_blog(self, blog_id, user_id):
        blog = self.blogs_collection.find_one({'_id': ObjectId(blog_id)})
        
        if user_id not in blog['users_like']:
            self.blogs_collection.update_one(
                {'_id': ObjectId(blog_id)},
                {'$inc': {'likes': 1}}
            )
            self.blogs_collection.update_one(
                {'_id': ObjectId(blog_id)},
                {'$addToSet': {'users_like': user_id}},
            )
            return self.map_blog(self.blogs_collection.find_one({'_id': ObjectId(blog_id)}))
        else:
            return self.map_blog(blog)
       

    def get_blogs(self):
        blogs = self.blogs_collection.find({})
        return [self.map_blog(blog) for blog in blogs]
    
    def clear_blogs(self):
        result = self.blogs_collection.delete_many({})
        return result.deleted_count
    