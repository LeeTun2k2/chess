from redis import Redis

REDIS_HOST = 'redis'
REDIS_PORT = 6379

def get_redis():
    return Redis(REDIS_HOST, REDIS_PORT)
