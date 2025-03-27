School Management API

A simple Node.js API for managing schools using Express.js and MySQL.

Setup
Clone the repository:
git clone https://github.com/Khushi2755/school.git  
cd school

Install dependencies
npm install

Create a .env file and add the following:
DB_HOST=localhost  
DB_USER=root  
DB_PASS=Coder@2324  
DB_NAME=school_management  
PORT=5000  

Start the server
npm start

The API will run on http://localhost:5000.

API Endpoints:
POST /schools → Add a new school
GET /schools → List all schools
GET /schools/nearby?lat=<latitude>&lng=<longitude> → Find nearby schools
