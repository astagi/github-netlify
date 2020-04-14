<template>
  <div id="app">
    <Repository v-for="repository of repositories" :key="repository.id" :repository="repository"/>
    <button v-on:click="fetchRepositories()" :disabled="!loadMoreEnabled">Load more</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import Repository from './components/Repository.vue';

@Component({
  components: {
    Repository,
  },
})
export default class App extends Vue {

  private repositories: any[] = [];
  private page = 1;
  private loadMoreEnabled = true;

  public fetchRepositories() {
    this.loadMoreEnabled = false;
    axios.get(`https://api.github.com/users/${process.env.VUE_APP_GITHUB_USER}/repos?page=${this.page}`).then((resp) => {
      this.repositories = this.repositories.concat(resp.data);
      this.page += 1;
    }).finally(() => {
      this.loadMoreEnabled = true;
    });
  }

  private mounted() {
    this.fetchRepositories();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
