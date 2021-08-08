const express = require("express");
const mongoose = require("mongoose");

const Post = mongoose.model("posts");
const User = mongoose.model("users");

module.exports = (app) => {
  // load user feed
  app.get("/user/feed", (req, res) => {
    if (req.user) {
      const followers = req.user.followers;
      const posts = [];

      for (let i = 0; i < followers.lenth; i++) {
        Post.find({ createdBy: followers[i] })
          .then((userPosts) => {
            posts.push(...userPosts);
          })
          .catch((err) => {
            console.error("Error: Couldn't load feed", err);
            res.status(500).send();
          });
      }
    } else {
      res.status(401).send();
    }
  });

  // load all user posts
  app.get("/user/posts", (req, res) => {
    if (req.user) {
      Post.find({ createdBy: req.user._id })
        .then((posts) => {
          res.send(posts);
        })
        .catch((err) => {
          console.error("Error: Couldn't load posts", err);
          res.status(500).send();
        });
    } else {
      res.status(401).send();
    }
  });

  // add new post
  app.post("/user/posts/new", (req, res) => {
    if (req.user) {
      const title = req.body.title;
      const text = req.body.text;
      const image = req.body.image;
      const createdBy = req.user._id;

      const newPost = new Post({
        title,
        text,
        image,
        createdBy,
        date: new Date(),
      });

      newPost.save();
    } else {
      res.status(401).send();
    }
  });

  // follower user
  app.get("/user/follow/:id", (req, res) => {
    if (req.user && req.user._id !== req.params.id) {
      const following = req.params.id;
      const follower = req.user._id;
      User.updateOne(
        { _id: req.user._id },
        { $push: { following: following } }
      ).catch((err) => {
        console.error("Error: An error occured while following user", err);
        res.status(500).send();
      });

      User.updateOne({ _id: userId }, { $push: { followers: follower } }).catch(
        (err) => {
          console.error("Error: Coudln't follow user", err);
          res.status(500).send();
        }
      );
    } else {
      res.status(401).send();
    }
  });

  //unfollow user
  app.get("/user/unfollow/:id", (req, res) => {
    if (req.user && req.user._id !== req.params.id) {
      const unfollow = req.params.id;
      const unfollower = req.user._id;

      User.updateOne(
        { _id: req.user._id },
        { $pull: { following: unfollow } }
      ).catch((err) => {
        console.error("Error: An error occured while following user", err);
        res.status(500).send();
      });

      User.findById(userId)
        .updateOne({ _id: userId }, { $pull: { followers: unfollower } })
        .catch((err) => {
          console.error("Error: Coudln't follow user", err);
          res.status(500).send();
        });
    } else {
      res.status(401).send();
    }
  });
};
