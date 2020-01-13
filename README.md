# NMLabFinalProject
Demo video: https://youtu.be/pwI22UQgD6c

## Quick Start
### Installation
```
git clone https://github.com/1998Isabel/NMLabFinalProject.git

cd NMLabFinalProject

# Install dependencies for server
npm install  

# Install dependencies for client
npm run client-install 
```
### Run Application
```bash
# Terminal 1: 
## Run ganache
ganache-cli -l 0xfffffffffffff -g 0x01 --seed test -b 1

# Terminal 2:
## Run truffle
truffle migrate
## Run the client & server with concurrently
npm run dev
```
### Setup Metamask
#### Open Metamask
![](https://i.imgur.com/4TZrDhj.png)

#### Change Network
![](https://i.imgur.com/tKBAmP8.png)

#### Import using account seed phrase
From ganache
![](https://i.imgur.com/OyNh5pT.png)

![](https://i.imgur.com/YGDsjvH.png)

#### Import Account 1 by private key
![](https://i.imgur.com/NEWDMwW.png)

Go to ganache terminal (Terminal 1)
**Copy the underlined private key**
![](https://i.imgur.com/ZS8BTMz.png)


![](https://i.imgur.com/dAIY3HU.png)

#### Allow Authentication
![](https://i.imgur.com/34mj2X8.png)



## How to use

### Name your username
* You cannot modify it after you save it
* It will automatically catch your Metamask account, and need your comfirmation to transfer 1 ETH to our server address
* Your name will be saved to our blockchain
![](https://i.imgur.com/pL1LRLn.png)

### Add post
* User can select category, add important text and upload image
* We use **IPFS** to upload image and get a hash value back to save it to our blockchain
* Also need comfirmation of ETH transfermation
* After adding a new post, our blockchain will save the hash value of the post **(posthash)** for following verification
![](https://i.imgur.com/juQtYRN.png)

### Delete post
* Press the **Delete** button to delete post
* **User has a certain time period(now we set it to 1 minute) before the post be added to our blockchain**
* During the time period, the post will only be saved in our local server database(mydb.json)
* Before saving post to our blockchain, our server will verify the post using the posthash
![](https://i.imgur.com/Pi1jAnB.png)

### Categories & Popular posts
#### Show all posts of a certain category
![](https://i.imgur.com/4cufTSo.png)
#### Popular posts
* User can press **Likes** button of every post infinite times
* The bar on the left will show 3 posts of most likes
![](https://i.imgur.com/Ueq84wl.png)


###### tags: `WebProgramming`
