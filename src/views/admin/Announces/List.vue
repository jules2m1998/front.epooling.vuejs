<template>
  <div class="w-full mb-12 px-4">
    <div class="mb-5 text-blueGray-600">
      <i class="fas fa-plus mr-1 text-lg text-lightBlue-400"></i>
      <router-link :to="{name: 'announce.form'}" class="text-lightBlue-400">
        Creer une annonce
      </router-link>
    </div>
    <card-table/>
  </div>
</template>

<script>
import CardTable from "@/components/Cards/CardTable";

export default {
  name: "Announce",
  components: {
    CardTable,
  },
}
</script>

<style scoped>

</style>