<template>
  <div>
    <div class="flex font-sans mb-3 shadow bg-white overflow-hidden rounded" v-for="(announce, key) in announces"
         :key="key">
      <div class="flex-none relative" style="width: 350px;">
        <img :src="getUrl(announce.image)" alt="" class="absolute inset-0 w-full h-full object-cover"
             loading="lazy"/>
      </div>
      <form class="flex-auto p-6">
        <div class="flex flex-wrap">
          <router-link class="flex-auto text-lg font-semibold text-slate-900"
                       :to="{ name: 'announce.item', params: {id: announce.id}}"
          >
            {{ announce.itinerary.name }}
          </router-link>
          <div class=" text-lg font-semibold text-slate-500
          ">
          {{ getPrice(announce) }} XAF
        </div>
        <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
          {{ announce.description.slice(0, 300) }}...
        </div>
    </div>
    <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
      <div class="">
        <div
            class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
          <span class="font-bold mr-1">Itineraire : </span> {{ getItinerary(announce) }}
        </div>
        <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
          <span class="font-bold mr-1">Duree : </span> {{ getDuration(announce) }}
        </div>
        <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
          <span class="font-bold mr-1">Depart : </span> {{ geStarttDate(announce) }}
        </div>
        <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
          <span class="font-bold mr-1">Arrivee : </span> {{ geEndDate(announce) }}
        </div>
      </div>
    </div>
    <div class="flex space-x-4 mb-6 text-sm font-medium">
      <div class="flex-auto flex space-x-4">
        <router-link class="h-10 px-6 font-semibold rounded-md bg-blueGray-600 text-white flex items-center" :to="{
              name: 'announce.edit',
              params: {
                id: announce.id
              }
            }">
          Modifier
        </router-link>
        <button class="h-10 px-6 font-semibold rounded-md bg-red-500 border border-slate-200 text-white"
                type="button" @click="delete_item(announce.id)">
          Supprimer
        </button>
      </div>
      <button
          class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
          type="button" aria-label="Like">
        <svg width="20" height="20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
        </svg>
      </button>
    </div>
    </form>
  </div>
  </div>
</template>

<script>
import {BASE_URI} from "@/store/config";
import moment from "moment"

export default {
  name: "AnnounceList",
  props: {
    announces: {
      type: Array,
      default: () => []
    }
  },
  emits: ['delete'],
  methods: {
    getUrl(url) {
      return BASE_URI + url;
    },
    getPrice(announce) {
      const prices = announce.itinerary?.itinerary_city
      if (prices) {
        return prices.map(price => price.price).reduce((a, b) => a + b).toLocaleString(
            {
              style: "currency",
              currency: "XAF"
            }
        );
      }
      return 0
    },
    getItinerary(announce) {
      let itinerary = announce.itinerary?.itinerary_city
      if (itinerary) {
        return itinerary.map(it => it.city.name).join(" ~ ")
      }
      return ''
    },
    getDuration(announce) {
      const itinerary = announce.itinerary
      if (itinerary) {
        const start = itinerary.start_date
        const end = itinerary.end_date
        const startDate = new Date(start)
        const endDate = new Date(end)
        const diffTime = Math.abs(endDate - startDate)
        const hours = Math.floor(diffTime / (1000 * 60 * 60))
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
        return `${hours}h ${minutes}min`
      }
      return 0
    },
    geStarttDate(announce) {
      const itinerary = announce.itinerary
      if (itinerary) {
        const start = itinerary.start_date
        return moment(start).locale("fr").calendar()
      }
      return 0
    },
    geEndDate(announce) {
      const itinerary = announce.itinerary
      if (itinerary) {
        const end = itinerary.end_date
        return moment(end).locale("fr").calendar()
      }
      return 0
    },
    delete_item(id) {
      this.$emit('delete', id)
    }
  }
}
</script>

<style scoped>

</style>