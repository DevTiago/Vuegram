<template>
  <div id="dashboard">
    <section>
      <div class="container">
        <div class="profile">
          <p>{{ userProfile.title }}</p>
          <div class="create-post m-auto col-6">
            <p>Post someting to the world:</p>
            <form @submit.prevent class="postForm">
              <b-input maxlength="200" type="textarea" v-model.trim="post.content"></b-input>
              <button
                @click="createPost"
                :disabled="post.content == ''"
                class="button is-primary"
              >Post</button>
            </form>
          </div>
        </div>

        <div class="posts">
          <div v-if="posts.length !== 0" class="cardContainer">
            <div v-for="(post, index) in posts" v-bind:key="index">
              <Post v-bind:post="post"></Post>
            </div>
          </div>
          <div v-else>
            <p class="no-results text-center">No recent posts!</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comments modal -->
    <!-- <transition name="fade">
      <div v-if="showCommentModal" class="c-modal">
        <div class="c-container">
          <a @click="closeCommentModal">X</a>
          <p>add a comment</p>
          <form @submit.prevent>
            <textarea v-model.trim="comment.content"></textarea>
            <button @click="addComment" :disabled="comment.content == ''" class="button">add comment</button>
          </form>
        </div>
      </div>
    </transition>-->

    <!-- post modal -->
    <!-- <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal" class="close">X</a>
          <div class="post">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li>
                <a>comments {{ fullPost.comments }}</a>
              </li>
              <li>
                <a>likes {{ fullPost.likes }}</a>
              </li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div v-for="(comment, index) in postComments" v-bind:key="index" class="comment">
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import Post from './Post.vue';

const fb = require("../../firebaseConfig");

export default {
  name: "Dashboard",
  components: {
    Post
  },
  data() {
    return {
      post: {
        content: ""
      },
      comment: {
        postId: "",
        userId: "",
        content: "",
        postComments: 0
      },
      showCommentModal: false,
      showPostModal: false,
      fullPost: {},
      postComments: []
    };
  },
  computed: {
    ...mapState(["userProfile", "currentUser", "posts", "hiddenPosts"])
  },
  methods: {
    createPost() {
      fb.postsCollection
        .add({
          createdOn: new Date(),
          content: this.post.content,
          userId: this.userProfile.uid,
          userName: this.userProfile.name,
          comments: 0,
          likes: 0
        })
        .then(ref => {
          this.post.content = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    showNewPosts() {
      let updatedPostsArray = this.hiddenPosts.concat(this.posts);
      // clear hidden posts array and update posts array
      this.$store.commit("setHiddenPosts", null);
      this.$store.commit("setPosts", updatedPostsArray);
    },
    openCommentModal(post) {
      this.comment.postId = post.id;
      this.comment.userId = post.userId;
      this.comment.content = post.comments;
      this.showCommentModal = true;
    },
    closeCommentModal() {
      this.comment.postId = "";
      this.comment.userId = "";
      this.comment.content = "";
      this.showCommentModal = false;
    },
    addComment() {
      let postId = this.comment.postId;
      let postComments = this.comment.postComments;

      fb.commentsCollection
        .add({
          createdOn: new Date(),
          content: this.comment.content,
          postId: postId,
          userId: this.currentUser.uid,
          userName: this.userProfile.name
        })
        .then(doc => {
          fb.postsCollection
            .doc(postId)
            .update({
              comments: postComments + 1
            })
            .then(_ => {
              this.closeCommentModal();
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    likePost(postId, postLikes) {
      let docId = `${this.currentUser.uid}_${postId}`;

      fb.likesCollection
        .doc(docId)
        .get()
        .then(doc => {
          if (doc.exists) {
            return;
          }

          fb.likesCollection
            .doc(docId)
            .set({
              postId: postId,
              userId: this.currentUser.uid
            })
            .then(_ => {
              // update post likes
              fb.postsCollection.doc(postId).update({
                likes: postLikes + 1
              });
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

