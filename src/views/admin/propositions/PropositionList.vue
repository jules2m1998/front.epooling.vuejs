<template>
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda at delectus, doloremque earum facilis harum incidunt itaque mollitia omnis rerum sequi sit? Aspernatur eum inventore minus praesentium reprehenderit rerum?
</p>
</template>

<script>
import {send_request_with_token} from "@/store/config";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PropositionList",
  methods: {
    ...mapActions({
      getUser: 'user/getCurrentUser'
    }),
    async getPropositionList() {
      const response = await send_request_with_token(`order/user/${this.current_user.id}`)
      if (response.ok){
        this.propositions = await response.json()
      }
    },
  },
  computed: {
    ...mapGetters({
      current_user: 'user/user'
    })
  },
  async created() {
    await this.getUser();
    await this.getPropositionList();
  },
  data() {
    return {
      propositions: [],
    }
  }
}
</script>

<style scoped>

</style>