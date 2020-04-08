
## Infrastructure

### VPC
VPC:
ipv4 cidr block: 10.0.0.0/24
enable dns hostnames

Subnet:
Auto-assign IPv4
ipv4 cidr block: 10.0.0.0/24

create intenet gateway and attach to vpc

create security group for vpc
- Custom  TCP 4000  nodejs
- Custom  TCP 8888  nodeos
- SSH     TCP 22
- Custom  TCP 3000  react app


### Server
New EC2 instance
- Ubuntu 18.0.4 LTS server
- > 4Gb memory (t2.medium)
- > 20Gb storage
Add to VPC and use security group

## CloudFront
New CloudFront distribution
- Origin: ec2 instance url
- Origin Protocol Policy: HTTP only
- HTTP port: 8888
- Allowed HTTP Methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE

You can now connect with block explorer
`https://local.bloks.io/?nodeUrl=du0rtkac8px3u.cloudfront.net&systemDomain=eosio`