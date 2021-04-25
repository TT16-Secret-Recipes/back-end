# Secret Family Recipes Cookbook
### back-end by Garrick Suemith

## URL
https://tt16-secret-recipes.herokuapp.com

## Endpoints
```
[POST] /api/auth/register
{
  "email": "s@mple.com",
  "username": "sample_user",
  "password": "password"
}
```
responds with:
```
{ 
  "id": 5,
  "email": "s@mple.com",
  "username": "sample_user",
  "password": "password"
}
```



```
[POST] /api/auth/login
{
  "username": "sample_user",
  "password": "password"
}
```
responds with:
```
{
    "message": "Welcome back, sample_user!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImdhcnJpY2siLCJlbWFpbCI6ImdAcnJpY2suY29tIiwiaWF0IjoxNjE5MzIwNzk1LCJleHAiOjE2MTkzMjE3OTV9.09z2GtvCx2dHipcI0JEryPlhEcoi1Y848facxvGjPtA"
}
// tokens expire after 15 minutes
```



```
[GET] /api/users
// set Header.Authorization to token
// Accessible only by this logged in user
{
  "username": "garrick",
  "password": "password"
}
// responds with list of users
```



```
[GET] /api/users/:id
// Accessible by logged in users with matching id
// set Header.Authorization to token
// responds with user info
```