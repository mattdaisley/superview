FROM node:boron

# Install dependencies
RUN apt-get update -y
RUN apt-get install -y less nano

# Download and Install Nginx
# RUN apt-get install -y nginx

# Remove the default Nginx configuration file
# RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file from the current directory
# ADD scripts/nginx /etc/nginx/

# RUN ln -s /etc/nginx/sites-available/superview.com /etc/nginx/sites-enabled/

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
# CMD ["service", "nginx", "start"]
CMD ["npm", "start"]
