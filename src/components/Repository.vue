<template>
  <a :href="repository.html_url">
    <h2>{{repository.name}}</h2>
    <p>{{repository.description}}</p>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Repository extends Vue {
  @Prop() private repository!: any;
}
</script>

<style scoped>

</style>
