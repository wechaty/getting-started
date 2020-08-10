FROM wechaty/wechaty

USER gitpod

# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
RUN sudo apt-get -q update \
    && sudo apt-get install -yq software-properties-common \
    && sudo add-apt-repository ppa:tsl0922/ttyd-dev \
    && sudo apt-get update \
    && sudo apt-get install ttyd \
    && apt-get purge --auto-remove \
    && rm -rf /tmp/* /var/lib/apt/lists/*
#
# More information: https://www.gitpod.io/docs/config-docker/
