const express = require("express");
const mongoose = require("mongoose");

const Post = mongoose.model("posts");
const User = mongoose.model("users");

module.exports = (app) => {
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

  app.get("/user/follow/:id", (req, res) => {
    if (req.user) {
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

  app.get("/user/unfollow/:id", (req, res) => {
    if (req.user) {
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
