How to run code
  Clone this repository
  Run the following commands in terminal
  * Navigate to the directory with code
  * **npm install** to install dependencies - node_modules
  * **nodemon start** to run the code
  * Domain - http://localhost:8080


Endpoints
  * /auth/google - login using google account
  * /api/logout - logout user
  * /user/feed - load user feed
  * /user/posts - load all user posts
  * /user/posts/new - add new post
  * /user/follow/:id - follow a user (users can't follow themselves)
  * /user/unfollow/:id - unfollow a user (users can't unfollow themselves)
  

Design Choices Involved
  * Decided to store followers and following for a user as part of USER model, as a NoSQL database is used (non-relational), so wouldn't make sense to have redundant DB operations
  * Decided to persist POST model for user's posts as a separate model, as it was specified in the problem statement
  * Used **cookie-session** to store encoded users as cookies in the browser (as there is no native support in Express to parse/store cookies + sessions)
  * Used **mongoose.js** for DB queries
  * Used **passport** for social login (Google)
  
  
Vulnerabilities
  * Credentials - Since this was a sample project, credentials/keys are included as part of configuration. This could be a potential point of attack for malicious          actors. Ideally, credentials/keys should be loaded from environment variables
  * Used cookies for protected routes. Ideally, tokens should be issues for successful authorisation corresponding to a user session (using JSON Web Tokens), insead of browser storage, as that is more vulnerable and a potential point of attack
