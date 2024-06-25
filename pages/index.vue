<template>
  <div class="homeBackground">
    <div class="homeContent">
      <div class="homeHeaders">
        <h1>Test Your Political Alignment Now.</h1>
        <p>Welcome to Political Latitude.</p>
      </div>
      <button class="pinkButton" @click="forceNavigate">Take the UK Test</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    forceNavigate() {
      window.location.href = '/ukTest';
    }
  }
}
</script>


