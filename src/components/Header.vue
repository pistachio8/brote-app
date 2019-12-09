<template>
  <header>
    <nav>
      <div class="container">
        <router-link :to="{ name: 'home' }" class="nav-logo">BROTE</router-link>

        <ul v-if="!isAuthenticated">
          <li>
            <a
              role="button"
              class="button-signin"
              arial-label="Login"
              @click="openModal('login')"
            >로그인</a>
          </li>
          <li>
            <a
              role="button"
              class="button-signup"
              arial-label="Signup"
              @click="openModal('signup')"
            >시작하기</a>
          </li>
        </ul>
        <ul v-else>
          <li>
            <router-link
              class="edit-article"
              :to="{name: 'editor'}"
              arial-label="Edit"
              active-class="active"
              exact
            >
              <i class="fas fa-external-link-alt"></i>
              <span class="a11y-hidden">새 글</span>
            </router-link>
          </li>
          <li>
            <router-link :to="profileLink" active-class="active" exact>{{currentUser.username}} 님</router-link>
          </li>
          <li>
            <a role="button" @click="logout">로그아웃</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import * as actions from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"]),
    profileLink() {
      return {
        name: "profile",
        params: {
          username: this.currentUser.username
        }
      };
    }
  },
  methods: {
    openModal(type) {
      this.$store.dispatch(actions.UPDATE_MODAL_STATE, type);
    },
    logout() {
      this.$store.dispatch(actions.LOGOUT);
    }
  }
};
</script>
