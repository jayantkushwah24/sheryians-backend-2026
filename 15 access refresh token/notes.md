# what is authentication?

- to identify which client has raised the request or where the request is coming from is called authentication.

# how we can achieve authentication?

- during the registration of the user we generate a token and provide that token to the user.
- now whenever user tries to access the resourse of database our server checks the token first and only after verifying that token server allows user to access the resources of database.

# there is any loophole in authentication?

- yes there is one loop. lets say user2 gets the laptop of user1 and user2 stole the token of user1 then user2 can access the data of user1.
- server will give data to user based on the token.
- now there no system in the world which is 100% secure and we can maximise the security of the system only.

# how we can solve the problem of stealing the token?

- we gonna maintain two tokens i.e. access token and refresh token.

## access token

- access token will act in authentication or identification of user in server.
- access token will expire after every certain amount of time.

## refresh token

- refresh token can only be used to generate new access token.
- after the expiry of current access token , user will send the refresh token to server and server will provide new access token and new refresh token to user.
- that newly created access token will again expire after certain amount of time.
- refresh token can not be used for authentication.

# what if someone stole access token and refresh token both?

- lets say user1 has currently have accessToken1 and refreshToken1.
- after the accessToken1 expires after certain amount of time, user will send refreshToken1 to server and server will send back the refreshToken2 and accessToken2 to user.
- server do one task more to store the current refresh token to database. so server will replace the refreshToken1 with refreshToken2.
- if user2 stole the refreshToken2 and accessToken2 so it can use for some amount of time .
- during the time user2 is accessing the resources of database the accessToken2 of user1 gonna be expired
- user1 will send the refreshToken2 to server and server will replace refreshToken2 with refreshToken3 in the database where the data of user1 is stored.
- now when the user2 will send refreshToken2 to server after expiration of accessToken2 of user2, server will sense the anamoly because server should get refeshToken3 but server is getting refreshToken2.
- after sensing the anamoly server will immediately logout the account or take instant action required to secure the data of user1.
