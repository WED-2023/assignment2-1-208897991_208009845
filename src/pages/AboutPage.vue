<template>
    <div class="container">
    <h1 class="title" >About Us</h1>
      <div class="jumbotron">

          <h1 class="names"><b>Chen Frydman</b></h1>
            </br>
          <p>
            Chen Frydman is a student of Software and Infomration Systems Engineering at Ben Gurion University. </br>
            He is an ingenious engineer with a passion for technology and innovation.</br>
             He is a team player and a quick learner, always eager to take on new challenges and learn new things.
          </p>
        <a href="https://github.com/ChenFryd">GitHub</a>
    </div>
    <div class="jumbotron">
        
        <h1 class="names"><b>Ofir Tamir</b></h1>
          </br>
        <p>
          Ofir Tamir is a student of Software and Infomration Systems Engineering at Ben Gurion University. </br>
          He is a leader and a team player, friendly and easy to work with. </br>
            He is a quick learner and always eager to take on new challenges and learn new things.
        </p>
      <a href="https://github.com/ofirtamir">GitHub</a>
  </div>
    </div>
</template>

<script>
    export default {
        name: 'AboutPage'
    };
</script>

<style lang="scss" scoped>
.container{
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    width: 1000px;
    // height: 600px;
}
.title{
    text-align: center;

}
.names {
    color: #007bff;
    text-align: center;
    
}  
</style>