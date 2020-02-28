
## Infrastructure

### Server
New EC2 instance
- Ubuntu 18.0.4 LTS server
- > 4Gb memory
- > 20Gb storage
- incoming rules
HTTP    TCP 80    react app
Custom  TCP 8888  nodeos
SSH     TCP 22
Custom  TCP 27017 mongodb
Custom  TCP 3000  nodejs
Custom  TCP 9418  git

## CloudFront
New CloudFront distribution
- Origin Protocol Policy: HTTP only
- HTTP port: 8888
- Allowed HTTP Methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
