```
export const registerUser = asyncHandler(async (req, res) => {
  //get details from frontend
  //name, email, pasasowrd, mobile, profile, role
  // tenant or landlord
  //validation check - "empty or not"
  //check if already exist or not
  //check for profile picture image
  //upload on cloudinary
  //handle file upload,
  //create user object to create entry in db
  /*if(role === "tenant"){
   await TenantModel.create({ userId: user._id })
   }

    if(role === "landlord"){
   await LandlordModel.create({ userId: user._id })
   }
 */
  //remove password and token from reponse
  //check for user creation
  //return response

});
```

```
export const loginUser = asyncHandler(async (req, res) => {
  //get email password from body
  //verify and validate (empty or not or valid credentials)
  //find if exist or not
  //password check
  //generate access and refresh token
  //send cookies
  //send response (exclude password and refresh token)
});
```

```
export const logoutUser = asyncHandler(async (req, res) => {
  //create a authentication middleware.get token from cookies/header and verify it with the encypted token using secret,
  //use the decoded token to find user,as token payload is ._id
  //set user to req and call next();
  //clear refreshToken and cookies
});
```

```
export const getCurrentUser = asyncHandler(async (req, res) => {
  //we have middleware
  //middleware injects user into req
  //return req.user
});
```

```
export const updateAccountDetails = asyncHandler(async (req, res) => {
  //email, number, phone
  //validate
  //fetch user and update
  //return succcesss
});
```

```
export const changePassword = asyncHandler(async (req, res) => {
  // get new, old password
  // check is correct or not
  // no need to hash, as we already hashing before save, using pre hook
});
```

```
export const updateProfile = asyncHandler(async (req, res) => {
  // get local file path
  // delete old one
  // uplaod new one
  // update in db
  // return
});
```
