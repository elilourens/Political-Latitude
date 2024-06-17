<template>
    <div>
        <div class="ukTestContent">
            <h2>Lets get Started.</h2>
            <p>For accurate results enter your constituency.</p>
            <input v-model="postcode" placeholder="Enter postcode" />
            <button @click="lookupConstituency">Look up</button>
            <p v-if="constituency">Constituency: {{ constituency }}</p>
            <p v-else-if="error">{{ error }}</p>
        </div>
    </div>
</template>
<script>
import { getConstituencyByPostcode } from "@/services/postcodeService.js";

export default{
    data(){
    return {
      postcode: '',
      constituency: null,
      error: null,
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
    },
}
</script>