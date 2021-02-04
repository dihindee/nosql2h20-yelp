echo 'Starting import'
mongoimport  --port 27017 --db "yelp" --collection "business" --file "yelp_academic_dataset_business.json"
mongoimport  --port 27017 --db "yelp" --collection "reviews" --file "yelp_academic_dataset_review.json"
mongoimport  --port 27017 --db "yelp" --collection "tips" --file "yelp_academic_dataset_tip.json"
mongoimport  --port 27017 --db "yelp" --collection "users" --file "yelp_academic_dataset_user.json"
python3 create_indexes.py
