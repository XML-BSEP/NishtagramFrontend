// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://localhost:8080',
  login:"login",
  auth:"auth",
  refresh:"refresh",
  confirmAccount : "confirmAccount",
  registration : "register",
  checkUsername : "checkUsername",
  checkEmail: "checkEmail",
  logout : "logout",
  resetPasswordMail : "resetPasswordMail",
  resetPassword : "resetPassword",
  resendPassCode : "resendPassCode",
  resendRegCode : "resendRegistrationCode",
  following : "following",
  usersFollowings : "usersFollowings",
  checkLoggedUser : "checkLoggedUser",
  getUserById : "getUserById",
  getUserProfileById : "getUserProfileById",
  editUser : "editUser",
  createPost : "addPost",
  feed : "feed",
  like : "like",
  dislike : "dislike",
  comment : "comment",
  favorite : "favorite",
  addToCollection : "addToCollection",
  removeLike : "removeLike",
  removeDislike : "removeDislike",
  getComments : "getAllComments",
  getMyPosts : "getPostsOnProfile",
  getPostById : "getPostById",
  getStories : "getStories",
  addStory : "addStory",
  getAllStoriesOnProfile : "getAllStoriesOnUserProfile",
  getAllHighlights : "getHighlights",
  addHighlights : "addToHighlight",
  getAllHighlightStories : "getStoriesHighlight",
  removeHighlight : "removeFromHighlight",
  saveHighlight : "saveHighlight",
  getCollections : "getAllCollections",
  getPostsInCollection : "getPostsInCollection",
  getFavorites : "getFavorites",
  addToFavorites : "addFavorite",
  isUserAllowedToFollow : "isAllowedToFollow",
  follow : "follow",
  cancelFollowRequest: "cancelFollowRequest",
  getAllUsersFollowersFront : "getAllUsersFollowersFront",
  followingFront : "getAllUsersFollowingFront",
  removeFavorite : "removeFavorite",
  isTotpEnabled : "isTotpEnabled",
  generateSecret : "generateSecret",
  verifySecret : "verifySecret",
  disableTwoFactor : "disableTotp",
  validateTotp : "validateTotp",
  unfollow : "unfollow",
  searchUser : "searchUser",
  removeFromCloseFriends : "removeFromCloseFriends",
  addToCloseFriends : "addToCloseFriends",
  isUserFollowingUser : "isUserFollowingUser"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
