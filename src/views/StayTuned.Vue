<template>
  <div class="container">
    <img id="logo" src="logo.png" alt="NUFT Logo">
    <div id="slogan">Your Guide to Universities in Egypt</div>
    <div id="stay-tuned">Coming Soon!</div>
    <a id="follow-us" href="https://cutt.ly/teuctojo" target="_blank">Follow Us</a>
  </div>
</template>

<script>
export default {
  name: 'NufEG',
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #001D3D;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

#logo {
  max-width: 100%; 
  margin-top: -100px;
  margin-bottom: -100px;
}

#slogan {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #D9D9D9;
}

#stay-tuned {
  font-style: italic;
  color: #D9D9D9;
  margin-bottom: 20px;
}

#follow-us {
  padding: 10px 20px;
  font-size: 16px;
  text-decoration: none;
  color: #FFFFFF;
  background-color: #FFBF00;
  border-radius: 5px;
  display: inline-block; 
}
</style>
