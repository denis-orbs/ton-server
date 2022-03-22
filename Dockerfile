FROM ubuntu 
ARG DEBIAN_FRONTEND=noninteractive


RUN apt update
RUN apt install git make cmake g++ libssl-dev zlib1g-dev wget curl -y
ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /root
RUN git clone --recursive https://github.com/newton-blockchain/ton.git
WORKDIR /root/ton

RUN mkdir /root/liteclient-build
WORKDIR /root/liteclient-build

RUN cmake /root/ton
RUN cmake --build . --target lite-client
RUN cmake --build . --target func
RUN cmake --build . --target fift


RUN wget https://newton-blockchain.github.io/global.config.json
RUN wget https://raw.githubusercontent.com/newton-blockchain/ton/master/crypto/smartcont/stdlib.fc
RUN cp /root/ton/crypto/fift/lib /root/fift-lib


WORKDIR /

# RUN apt-get install curl
ENV FIFTPATH=/root/fift-lib

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

RUN apt-get install nodejs -y

RUN mkdir /node-server

WORKDIR /node-server

COPY  ./node-server .

RUN npm install

CMD npm run start

