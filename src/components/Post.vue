<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ post.userName }}</p>
        </div>
      </div>

      <div class="content">
        {{ post.content | trimLength }}
        <br />
        <time>{{ post.createdOn | formatDate }}</time>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";

export default {
  name: "Post",
  props: ['post'],
  filters: {
       formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val.toDate();
      return moment(date).fromNow();
    },
     trimLength(val) {
      if (val.length < 200) {
        return val;
      } else return `${val.substring(0, 200)}...`;
    }
  }
};
</script>