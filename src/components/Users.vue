<template>
  <div id='userInfo'>
    <h4>{{ user.username }}</h4>
    <p>{{ user.victoryPoints }}</p>
  </div>
</template>

<script>
  export default {
    name: 'card',
    data() {
      return {

      };
    },
    props: ['user'],
  };
</script>
