# Secret Family Recipes Cookbook
### back-end by Garrick Suemith

## URL
https://tt16-secret-recipes.herokuapp.com

## Endpoints
```
[GET] /api/recipes/:id
```
```
{
  "id": 1,
  "title": "Microwave Ramen",
  "source": "Garrick's College Roommate",
  "contributor": "garrick",
  "categories": ["easy", "asian"],
  "description": "A very easy recipe for when you have no time to get your nightly dose of carbs, sodium, and MSG.",
  "ingredients": [
    {
      "ingredient_id": 1,
      "name": "water",
      "quantity": 2,
      "unit": "cup"
    },
    {
      "ingredient_id": 666,
      "name": "packaged ramen",
      "quantity": 1,
      "unit": "package"
    }
  ],
  "steps": [
    {
      "step_number": 1,
      "instructions": "Put water in microwave safe container and heat on high for 5 minutes or until boiling."
    },
    {
      "step_number": 2,
      "instructions": "Open flavor packet, empty contents into water, and stir."  
    },
    {
      "step_number": 3,
      "instructions": "Place uncooked noodles into broth, cover, and let sit for 5 minutes.  You may heat it further in microwave, stirring occasionally."
    },
    {
      "step_number": 4,
      "instructions": "Allow to cool safely and enjoy."
    }
  ]
}
```

```
[POST] /api/auth/register
{
  "email": "s@mple.com",
  "username": "sample_user",
  "password": "password"
}

// responds with:
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

// responds with:
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
