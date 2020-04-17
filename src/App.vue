<template>
  <div id="app">
    <h1>My Github repositories</h1>
    <div class="row">
      <Repository v-for="repository of repositories" :key="repository.id" :repository="repository"/>
    </div>
    <div style="text-align:center;">
      <button v-on:click="fetchRepositories()" v-if="loadMoreEnabled">Load more</button>
      <p v-if="!loadMoreEnabled">Loading...</p>
    </div>
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
    axios.get(`${process.env.VUE_APP_BACKEND_ENDPOINT}/getmyrepos?page=${this.page}`)
      .then((resp) => {
        this.repositories = this.repositories.concat(resp.data);
        this.page += 1;
      })
      .finally(() => {
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
}

button{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding:0.35em 1.2em;
  border:0.1em solid #2c3e50;
  border-radius:0.12em;
  text-decoration:none;
  font-size: 2rem;
  color: #2c3e50;
  text-align:center;
  transition: all 0.2s;
  background-color: white;
  cursor: pointer;
  margin: 1rem;
}

button:hover {
  color: white;
  background-color:#2c3e50;
}
</style>
