<template>
  <div class="">
    <div class="ukTestContent">
      <div v-if="!showTest">
        <h2>Lets get Started.</h2>
        <h3>For accurate results enter your post code.</h3>
        <input v-model="postcode" placeholder="Enter postcode" />
        <button @click="lookupConstituency">Look up</button>
        <button @click="submitConstituency()">Not from the UK?</button>
        <p v-if="constituency">Constituency: {{ constituency }}</p>
        <p v-else-if="error">{{ error }}. Invalid Postcode. Try different format or use all caps.</p>  
        <button v-if="constituency" @click="submitConstituency()">Yes, this is correct.</button>
      </div>

      <div v-if="showTest" class="container">
        <div class="question-container">
          <div class="question-box">
            <h3>Question {{ questions[currentQuestionIndex].id }}.</h3>
            <h1>{{ questions[currentQuestionIndex].question }}</h1>
          </div>
        </div>
        <div class="answers-container">
          <div class="answer-box" :class="{ 'selected': selectedAnswer === index }" v-for="(answer, index) in questions[currentQuestionIndex].answers" :key="index" @click="selectAnswer(index)">
            <p>{{ answer.text }}</p>
          </div>
        </div>
      </div>
      <div v-if="showTest" class="submitButtonContainer">
        <button class="" @click="submitAnswer()">Submit Answer.</button>
      </div>
    </div>
  </div>
</template>


<script>
import { getConstituencyByPostcode } from "@/services/postcodeService.js";
import questions from '@/questions/uk2024.json';

export default {
  mounted() {
    window.addEventListener('beforeunload', this.preventLeave);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.preventLeave);
  },
  data() {
    return {
      postcode: '',
      constituency: null,
      error: null,
      showTest: false,
      currentQuestionIndex: 0,
      questions: questions,
      selectedAnswer: null,

      labourScore: 0,
      toryScore: 0,
      snpScore: 0,
      greenScore: 0,
      libdemScore: 0,
      reformScore: 0,
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
    submitConstituency() {
      // Save to local storage?
      this.showTest = true;
    },
    selectAnswer(index) {
      this.selectedAnswer = index;
    },
    submitAnswer() {
      if (this.selectedAnswer !== null) {
        const selectedValue = this.questions[this.currentQuestionIndex].answers[this.selectedAnswer].value;
        switch (selectedValue) {
          case 'Labour':
            this.labourScore++;
            break;
          case 'Tory':
            this.toryScore++;
            break;
          case 'Snp':
            this.snpScore++;
            break;
          case 'LibDem':
            this.libdemScore++;
            break;
          case 'Reform':
            this.reformScore++;
            break;
          default:
            console.log('No valid party associated with this answer');
        }

        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.selectedAnswer = null;
          
        } else {
          console.log('Test completed');
        }
      } else {
        console.log('No answer selected');
      }
    },
    preventLeave(event) {
      const message = 'If you leave this page, you will have to restart the test.';
      event.returnValue = message;
      return message;
    }
  },
}
</script>
