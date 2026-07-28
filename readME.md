


## CREATING GOUPS API's

1. Payload;
 -id,user.details,

2.Function
 -Counts the number of users in the contact that have been clicked
 -Remove the user who is clicked twice and remove the id from the payload, -To remove the id that was to be added,check if the specific id
  is already present be using the method `array001.include(nameOfsecondArr)` this filter the id out.
- if the user has added less than two users, The createGroup function does not run `Can not create groupt with less than two users`