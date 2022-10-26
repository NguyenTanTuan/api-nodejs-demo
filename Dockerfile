FROM public.ecr.aws/lambda/nodejs:14

# Copy our application code
WORKDIR /var/task

COPY . .

# Install NPM dependencies for function
RUN npm install

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "index.handler" ]