<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-sm font-bold">
                Creez un compte
              </h6>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300"/>
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form @submit.prevent="register">
              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  Nom d'utlisateur
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

              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  Confirmer le mot de passe
                </label>
                <input
                    type="password"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Confirmer le mot de passe"
                    v-model="confirmPwd"
                />
              </div>

              <hr class="mt-6 border-b-1 border-blueGray-300"/>


              <div class="text-center mt-6">
                <button
                    class="text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    :class="{ 'bg-blueGray-800 active:bg-blueGray-600' : !isLoad, 'bg-blueGray-600' : isLoad }"
                    type="submit"
                >
                  <template v-if="isLoad">
                    <loader class="flex justify-center justify-center"/>
                  </template>
                  <template v-else>
                    Creer un compte
                  </template>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="flex flex-wrap mt-6 relative">
          <div class="text-white">
            Vous avez deja un compte ?
            <router-link :to="{ name: 'login' }" class="text-blueGray-300 ml-2">
              <small>Se connecter</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from "@/components/Loader";
import {mapActions} from 'vuex'

export default {
  components: {
    Loader
  },
  data() {
    return {
      isLoad: false,
      form: {
        username: '',
        password: ''
      },
      confirmPwd: ''
    };
  },
  methods: {
    ...mapActions({
      login: 'account/register',
      noticeMe: 'notice/addNotice'
    }),
    async register() {
      this.isLoad = true;
      try {
        if (this.form.password === this.confirmPwd) {
          await this.sendForm();
        } else {
          this.noticeMe({
            isError: true,
            msg: 'Les mots de passe ne correspondent pas'
          });
        }
      } catch (e) {
        console.log(e)
        this.noticeMe({
          isSuccess: true,
          msg: 'Une erreur est survenue verifier vos informations !'
        })
      } finally {
        this.isLoad = false
      }
    },
    async sendForm() {
      const {response, data} = await this.login(this.form)
      console.log(response)
      if (response.ok) {
        this.noticeMe({
          isSuccess: true,
          msg: 'Votre compte a été créé avec succès'
        })
        await this.$router.push({
          name: 'login'
        })
      } else {
        console.log('szdfsdfhjsdfd')
        const msg = data.detail.map(it => ({
          msg: it.message,
          isError: true
        }))
        msg.forEach(it => this.noticeMe(it))
        console.log(msg, 'dsfcjhdfghsda')
      }
    }
  },
};
</script>
