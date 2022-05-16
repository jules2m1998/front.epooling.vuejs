<template>
  <form
      @submit.prevent="create"
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">Mon compte</h6>
        <button
            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="submit"
        >
          <template v-if="isLoad">
            <loader class="flex justify-center justify-center"/>
          </template>
          <template v-else>
            Enregistrer
          </template>
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <div>
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Informatiion sur le compte
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
              >
                Nom d'utilisateur
              </label>
              <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="account.username"
                  placeholder="lucky.jesse"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
              >
                Addresse email
              </label>
              <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="jesse@example.com"
                  v-model="user_detail.email"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
              >
                Extension du numéro de téléphone
              </label>
              <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="+237"
                  v-model="user_detail.phone_ex"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
              >
                Numéro de téléphone
              </label>
              <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="6xxxxxxxx"
                  v-model.number="user_detail.phone"
              />
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300"/>

        <div class="flex items-center mt-3" v-if="isCheckVisible">
          <input id="remember-me" name="remember-me" type="checkbox" v-model="isEnterprise"
                 class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Compte pour entreprise </label>
        </div>

        <template v-if="!isTypeEnterprise">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Informaton personnelle
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  Nom
                </label>
                <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Nom"
                    v-model="person.last_name"
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  Prenom
                </label>
                <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Prenom"
                    v-model="person.first_name"
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <label for="country" class="block text-sm font-medium text-gray-700">Sexe</label>
              <select v-model.number="person.sex" id="country" name="sexe" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="0">Home</option>
                <option value="1">Femme</option>
              </select>
            </div>
          </div>
        </template>
        <template v-else>
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Informaton personnelle
          </h6>
          <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Nom de l'entreprise
              </label>
              <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Douala, makepe missoke"
                  v-model="society.name"
              />
            </div>
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Localisation
              </label>
              <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Douala, makepe missoke"
                  v-model="society.location"
              />
            </div>
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                description
              </label>
              <textarea
                type="text"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                rows="4"
                placeholder="description"
                v-model="society.desc"
              ></textarea>
            </div>
          </div>
        </div>
        </template>
      </div>
    </div>
  </form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Loader from "@/components/Loader";

export default {
  components: {
    Loader
  },
  data() {
    return {
      isEnterprise: true,
      isLoad: false,
      user_detail: {
        email: null,
        phone: null,
        phone_ex: null,
        avatar_url: '',
      },
      person: {
        first_name: null,
        last_name: null,
        sex: null,
      },
      society: {
        desc: null,
        location: null,
        name: null
      }
    }
  },
  methods: {
    ...mapActions(
        {
          createCurrentUser: "user/createCurrentUser",
          getCurrentUser: "user/getCurrentUser",
        }
    ),
    async create(){
      this.isLoad = true;
      try {
        if(this.isEnterprise){
          const user = { ...this.user_detail, ...this.society, account_id: this.account.id };
          console.log(user);
          await this.createCurrentUser({user});
        }else{
          const user = { ...this.user_detail, ...this.person, account_id: this.account.id };
          await this.createCurrentUser({user, isPerson: true})
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoad = false;
      }
    },
    async getUser(){
      try {
        await this.getCurrentUser()
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    ...mapGetters({
      account: "account/account",
      current_user: "user/user",
    }),
    isCheckVisible() {
      return !this.current_user;
    },
    isTypeEnterprise() {
      if(!this.current_user){
        return this.isEnterprise;
      } else {
        return !!this.current_user.society;
      }
    },
  },
  async created() {
    await this.getUser();
    if (this.current_user){
      this.user_detail.email = this.current_user.email
      this.user_detail.phone = this.current_user.phone
      this.user_detail.phone_ex = this.current_user.phone_ex
      this.user_detail.avatar_url = this.current_user.avatar_url

      this.person.first_name = this.current_user.person?.first_name
      this.person.last_name = this.current_user.person?.last_name
      this.person.sex = this.current_user.person?.sex

      this.society.desc = this.current_user.society?.desc
      this.society.location = this.current_user.society?.location
      this.society.name = this.current_user.society?.name
    }
  }
}
</script>