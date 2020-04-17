<template>
  <div class="repobox col-xs-12 col-lg-4 col-sm-12 col-md-6">
    <a :href="repository.html_url">
      <h2>{{repository.name}}</h2>
      <p>{{repository.description}}</p>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Repository extends Vue {
  @Prop() private repository!: any;
}
</script>

<style scoped>
.repobox {
  background: #2c3e50;
  border: 1px solid white;
}

.repobox a {
  color: white;
  text-decoration: none;
}

</style>
