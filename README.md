# Secret Family Recipes Cookbook
### back-end by Garrick Suemith

## URL
https://tt16-secret-recipes.herokuapp.com

## Endpoints

[[GET] /api/recipes](#one)  
[[GET] /api/recipes/:id ](#two)  
[[POST] /api/recipes](#seven)  
[[POST] /api/auth/register](#three)  
[[POST] /api/auth/login](#four)  
[[GET] /api/users](#five)  
[[GET] /api/users/:id](#six)  

<a name="one">Get all Recipes Summaries</a>
```
[GET] /api/recipes/
```
```
[
  {
    "id": 1,
    "title": "Microwave Ramen",
    "source": "Garrick's College Roommate",
    "contributor": "garrick",
    "categories": ["easy", "asian", "noodles"],
    "description": "A very easy recipe for when you have no time to get your nightly dose of carbs, sodium, and MSG."
  }, 
  {
    "id": 2,
    "title": "Filipino Goulash",
    "image_url": 'something.com',
    "source": "Garrick's Mom",
    "contributor": "garrick",
    "categories": ["dinner", "filipino", "ground pork"],
    "description": "Reminiscent of chili, this hearty dish goes well with steamed rice."
  }
]
```
<a name="two">Get Full Recipe</a>
```
[GET] /api/recipes/:id 
// restricted to contributing user
```
```
{
  "id": 1,
  "title": "Microwave Ramen",
  "image_url": 'something.com',
  "source": "Garrick's College Roommate",
  "contributor": "garrick",
  "categories": ["easy", "asian", "noodles"],
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

<a name="seven">Submit recipe</a>
```
[POST] /api/recipes
{
  "title": "Microwave Ramen",
  "image_url": "something.com",
  "source": "Garrick's College Roommate",
  "user_id": 1,
  "categories": ["easy", "asian", "noodles"],
  "description": "A very easy recipe for when you have no time to get your nightly dose of carbs, sodium, and MSG.",
  "ingredients": [
    {
      "name": "water",
      "quantity": 2,
      "unit": "cup"
    },
    {
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

<a name="three">Register</a>
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



<a name="four">Log in</a>
```
[POST] /api/auth/login
{
  "username": "sample_user",
  "password": "password"
}

// responds with:
{
    "message": "Welcome back, sample_user!",
    "token": "eyJhbGc..."
}
// tokens expire after 15 minutes
```



<a name="five">Get list of users</a>
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



<a name="six">Get one user</a>
```
[GET] /api/users/:id
// Accessible by logged in users with matching id
// set Header.Authorization to token
// responds with user info
```
