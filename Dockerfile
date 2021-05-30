FROM node:14
 
WORKDIR /usr/app

# 
#
# package* = package and package-lock
COPY package*.json ./

RUN npm install

# check .dockerignore
# . = current dir
COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]

# t= tag, p=port .= dot is important, mean current directory
#docker builder build -t <username/projectname:version> .
#docker run -p 3000:8080 <name> .      
#docker images
#docker ps
#hostname = host.docker.internal

#volume = persistent storage
#docker volume create  <name>
#--mount source=<name>, target=/wut?

#docker-compose up/down
#docker-compose.yml