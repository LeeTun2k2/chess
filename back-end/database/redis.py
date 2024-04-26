from redis import Redis

REDIS_HOST = 'localhost'
REDIS_PORT = 6379

def get_redis():
    return Redis(host='localhost', port=6379)
