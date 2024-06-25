<template>
  <div class="header">
    <div class="navbar">
      <div class="nav-section">
        <button @click="forceNavigate()" class="invisibleButton">
          <img src="~/assets/globe.png" alt="Globe">
          
        </button>
        <p class="logo-text"><strong>Political Latitude</strong></p>

        
      </div>
      <div class="nav-section">
        <p><strong>Data</strong></p>
        <p><strong>Country List</strong></p>
      </div>
    </div>
  </div>
    
    
  </template>
  
<script>
export default {
  name: 'NavBar',
  methods: {
    forceNavigate() {
      window.location.href = '/';
    }
  }
}
</script>
  