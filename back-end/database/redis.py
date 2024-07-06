from redis import Redis

REDIS_HOST = 'localhost'
REDIS_PORT = 6379

def get_redis():
    return Redis(host=REDIS_HOST, port=REDIS_PORT)

