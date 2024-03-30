# Use Alpine Linux as base image
FROM alpine:latest

# Install necessary dependencies
RUN apk update && \
    apk add --no-cache git g++ make && \
    rm -rf /var/cache/apk/*

# Copy and build engine
WORKDIR /stockfish
COPY /src /src
RUN cd /src && make -j profile-build ARCH=x86-64-avx2

# Set the entry point to Stockfish executable
ENTRYPOINT ["/stockfish/src/stockfish"]
