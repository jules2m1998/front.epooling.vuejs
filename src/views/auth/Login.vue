<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-sm font-bold">
                Connexion
              </h6>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300"/>
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form @submit.prevent="login">
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
                    placeholder="Nom d'utilisateur"
                    v-model="form.username"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  Mot de passe
                </label>
                <input
                    type="password"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Mot de passe"
                    v-model="form.password"
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                      id="customCheckLogin"
                      type="checkbox"
                      class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Remember me
                  </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                >
                  <template v-if="isLoad">
                    <loader class="flex justify-center justify-center"/>
                  </template>
                  <template v-else>
                    Se connecter
                  </template>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1 text-right">
            <router-link to="/auth/register" class="text-blueGray-200">
              <small>Creer un compte</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from "vuex";
import Loader from "@/components/Loader";

export default {
  components: {
    Loader
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      isLoad: false
    };
  },
  computed: {
    ...mapGetters({
      account: 'account/account',
      token: 'account/token'
    })
  },
  created() {
    if (this.account.username) {
      this.form.username = this.account.username
    }
  },
  methods: {
    ...mapActions({
      getToken: 'account/getToken',
      noticeMe: 'notice/addNotice'
    }),
    async login() {
      this.isLoad = true;
      try {
        const response = await this.getToken(this.form);
        await this.$router.push({name: 'dashboard'});
        if (response.ok){
          this.noticeMe({msg: 'Vous etes connecté', isSuccess: true});
        } else {
          if (response.status === 401) {
            this.noticeMe({msg: 'Identifiants incorrects', isError: true});
          } else {
            this.noticeMe({msg: 'Une erreur est survenue', isError: true});
          }
        }
      } catch (e) {
        this.noticeMe({msg: e.message, isError: true});
      }  finally {
        this.isLoad = false;
      }
    }
  }
};
</script>
