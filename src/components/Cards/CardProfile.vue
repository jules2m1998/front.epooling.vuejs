<template>
  <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
  >
    <div class="px-6 flex flex-col justify-center items-center" v-if="current_user">
      <div class="flex flex-wrap justify-center">
        <div class="w-full px-4 flex justify-center">
          <div class="relative">
            <default-image v-if="!current_user.avatar_url" style="width: 200px; height: 200px;" />
            <img v-else :src="`${uri}${current_user.avatar_url}`" class="object-cover border border-indigo-600 rounded-full mt-3" style="width: 200px; height: 200px;" />
          </div>
        </div>
      </div>
      <div class="mt-12">
        <h3
            class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
        >
          <template v-if="current_user.society">
            {{ current_user.society.name }}
          </template>
          <template v-if="current_user.person">
            {{ current_user.person.last_name }} {{ current_user.person.first_name }}
          </template>
        </h3>
        <div
            class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
            v-if="current_user.society"
        >
          <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          {{ current_user.society.location }}
        </div>
        <div class="mb-2 text-blueGray-600 mt-2" v-if="current_user.society">
          <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
          Enterprise
        </div>
        <div class="mb-2 text-blueGray-600" v-else>
          <i class="fas fa-user mr-2 text-lg text-blueGray-400"></i>
          Particulier
        </div>
        <div class="mb-2 text-blueGray-600">
          <i class="fas fa-at mr-2 text-lg text-blueGray-400"></i>

          <a class="text-lightBlue-400" :href="`mailto:${current_user.email}`">
            {{ current_user.email }}
          </a>
        </div>
        <div class="mb-2 text-blueGray-600" v-if="current_user.person">
          <i class="fas fa-mars mr-2 text-lg text-blueGray-400" v-if="current_user.person.sex !== 1"></i>
          <i class="fas fa-venus mr-2 text-lg text-blueGray-400" v-else></i>

          <a class="text-lightBlue-400" :href="`mailto:${current_user.email}`">
            {{ current_user.person.sex === 1 ? 'Femme' : 'Homme' }}
          </a>
        </div>
        <div class="mb-5 text-blueGray-600">
          <i class="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
          <a class="text-lightBlue-400" :href="`tel:${current_user.phone_ex}${current_user.phone}`">
            {{ current_user.phone_ex }} {{ phoneFormat(current_user.phone) }}
          </a>
        </div>
      </div>
      <div class="mt-10 py-10 border-t border-blueGray-200" v-if="current_user.society">
        <div class="flex flex-wrap">
          <div class="mb-2 text-blueGray-600 mt-2 pl-4">
            Description
          </div>
          <p class="w-full px-4">
            {{ current_user.society.desc }} lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import team2 from "@/assets/img/team-2-800x800.jpg";
import DefaultImage from "@/components/DefaultImage";
import {BASE_URI} from "@/store/config";

export default {
  components: {DefaultImage},
  methods: {
    phoneFormat(input) {
      console.log(input);
      if (!input || isNaN(input)) return `input must be a number was sent ${input}`
      if (typeof (input) !== 'string') input = input.toString()
      if (input.length === 9) {
        return input.replace(/(\d)(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
      } else {
        return input
      }
    }
  },
  computed: {
    ...mapGetters({
      current_user: "user/user",
    })
  },
  data() {
    return {
      team2,
      uri: BASE_URI
    };
  },
};
</script>
