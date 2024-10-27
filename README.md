# KABAN
Kaban is a project management tool that helps the team get information about tasks, and allows the manager to track their completion.

# About the project 
The project is built according to the "feature sliced design" architecture, make sure to read the documentation before starting work: https://feature-sliced.design/docs

# Deployment

### Production

1. Clone the repository:
   - git clone
2. Run docker build:
   - docker build . -t frontend
3. Run docker run, specify environment variables in the command, for example:
   - docker run -d -p 3000:3000 -e VITE_PUBLIC_URL=url-of-backend-application frontend

### Development

1. Make sure Node.js is installed on your computer.
2. Clone the repository:
   - git clone
3. Create a .env file in the root directory, example content:
   - VITE_PUBLIC_URL=url-of-backend-application
4. Install dependencies:
   - npm install
5. Start the project:
   - npm run dev
