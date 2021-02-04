from pymongo import MongoClient
print('creating indexes...')
mongo_client = MongoClient('mongodb://localhost:27017')
db = mongo_client.yelp
db.users.create_index('user_id')
db.reviews.create_index('user_id')
db.reviews.create_index('business_id')
db.tips.create_index('user_id')
db.tips.create_index('business_id')
