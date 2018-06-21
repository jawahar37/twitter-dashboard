import tweepy
from tweepy import OAuthHandler

from flask import Flask
from flask import json
from flask import Response
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/user/*": {"origins": "*"}}) 


class TwitterClient(object):
    def __init__(self):
        '''
        Class constructor or initialization method.
        '''
        # keys and tokens from the Twitter Dev Console
        consumer_key = 'xvEAK72HXroHyhTk3dTuVFTig'
        consumer_secret = 'U89hJup3zCLAOkH2YarbCkp9yhrgBvNeDSI6ZgKnc2PHT1nO0T'
        #access_token = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX'
        #access_token_secret = 'XXXXXXXXXXXXXXXXXXXXXXXXX'
 
        # attempt authentication
        try:
            # create OAuthHandler object
            self.auth = OAuthHandler(consumer_key, consumer_secret)
            
            # set access token and secret
            #self.auth.set_access_token(access_token, access_token_secret)
            
            # create tweepy API object to fetch tweets
            self.api = tweepy.API(self.auth)
        except:
            print("Error: Authentication Failed")
 
    def get_tweets(self, query, count = 10):
        '''
        Main function to fetch tweets and parse them.
        '''
        # empty list to store parsed tweets
        tweets = []
 
        try:
            # call twitter api to fetch tweets
            fetched_tweets = self.api.search(q = query, count = count)
 
            # parsing tweets one by one
            for tweet in fetched_tweets:
                # empty dictionary to store required params of a tweet
                parsed_tweet = {}
 
                # saving text of tweet
                parsed_tweet['text'] = tweet.text
 
                # appending parsed tweet to tweets list
                if tweet.retweet_count > 0:
                    # if tweet has retweets, ensure that it is appended only once
                    if parsed_tweet not in tweets:
                        tweets.append(parsed_tweet)
                else:
                    tweets.append(parsed_tweet)
 
            # return parsed tweets
            return tweets
 
        except tweepy.TweepError as e:
            # print error (if any)
            print("Error : " + str(e))
 
api = TwitterClient().api

@app.route('/user/<username>')
def show_user_profile(username):

    response = Response(
        response=json.dumps(api.get_user(username)._json),
        status=200,
        mimetype='application/json'
    )
    
    return response