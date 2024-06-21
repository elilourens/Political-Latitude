<template>
    <div>
      <div class="ukTestContent">
        <div v-if="!showTest">
          <h2>Lets get Started.</h2>
          <h3>For accurate results enter your post code.</h3>
          <input v-model="postcode" placeholder="Enter postcode" />
          <button @click="lookupConstituency">Look up</button>
          <p v-if="constituency">Constituency: {{ constituency }}</p>
          <p v-else-if="error">{{ error }}. Try different format or use all caps.</p>  
          <button v-if="constituency" @click="submitConstituency()">Yes, this is correct.</button>
        </div>

        <div v-if="showTest" class="container">
  <div class="question-container">
    <div class="question-box">
      <h3>Question {{  questions[currentQuestionIndex].id }}.</h3>
      <h1>{{ questions[currentQuestionIndex].question }}</h1>
    </div>
  </div>
  <div class="answers-container">
    <div class="answer-box" v-for="(answer, index) in questions[currentQuestionIndex].answers" :key="index" @click="selectAnswer(answer.value)">
      <p>{{ answer.text }}</p>
    </div>
  </div>
</div>


      </div>
    </div>
</template>
<script>
import { getConstituencyByPostcode } from "@/services/postcodeService.js";
import questions from '@/questions/uk2024.json';

export default{
    data(){
    return {
      postcode: '',
      constituency: null,
      error: null,
      showTest: true,
      currentQuestionIndex: 0,
      questions: questions,
    };
    },
    methods: {
    async lookupConstituency() {
      try {
        this.error = null;
        this.constituency = await getConstituencyByPostcode(this.postcode);
        console.log(this.constituency);
      } catch (error) {
        this.error = error.message;
        this.constituency = null;
      }
    },
    submitConstituency(){
      //save to local storage?
      this.showTest = true;
    },

    },
}
</script>