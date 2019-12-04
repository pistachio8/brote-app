<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" ref="modal">
          <div class="modal-header">
            <div v-if="modalType === 'login'">
              <h3>로그인</h3>
              <span>BROTE APP에 로그인하세요!</span>
            </div>
            <div v-else-if="modalType === 'signup'">
              <h3>시작하기</h3>
              <span>BROTE APP을 시작해보세요!</span>
            </div>
          </div>
          <div v-if="modalType === 'login'" class="modal-content">
            <ul v-if="errors" class="error-message">
              <li v-for="(error, key) in errors" :key="key">
                <i class="fas fa-exclamation-circle"></i>
                {{ key }} {{ error[0] }}
              </li>
            </ul>
            <form class="login-form" method="POST" @submit.prevent="login">
              <div class="input-wrapper">
                <fieldset>
                  <legend>Email</legend>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    v-model="email"
                    @focus="onFocus($event)"
                    @blur="onBlur($event)"
                    required
                  />
                </fieldset>
              </div>
              <div class="input-wrapper">
                <fieldset>
                  <legend>비밀번호</legend>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="password"
                    @focus="onFocus($event)"
                    @blur="onBlur($event)"
                    required
                  />
                </fieldset>
              </div>
              <button type="submit" class="submit-button" @click.prevent="login">로그인 하기</button>
            </form>
            <span class="check-form-type">
              아직 계정이 없다면?
              <a role="link" @click="changeForm('signup')" tabindex="0">회원가입</a>
            </span>
          </div>
          <div v-if="modalType === 'signup'" class="modal-content">
            <ul v-if="errors" class="error-message">
              <li v-for="(error, key) in errors" :key="key">
                <i class="fas fa-exclamation-circle"></i>
                {{ key }} {{ error[0] }}
              </li>
            </ul>
            <form class="signup-form" method="POST">
              <div class="input-wrapper">
                <fieldset>
                  <legend>사용자명</legend>
                  <input
                    type="text"
                    name="username"
                    id
                    v-model="username"
                    @focus="onFocus($event)"
                    @blur="onBlur($event)"
                    required
                  />
                </fieldset>
              </div>
              <div class="input-wrapper">
                <fieldset>
                  <legend>Email</legend>
                  <input
                    type="text"
                    name="email"
                    id
                    v-model="email"
                    @focus="onFocus($event)"
                    @blur="onBlur($event)"
                    required
                  />
                </fieldset>
              </div>
              <div class="input-wrapper">
                <fieldset>
                  <legend>비밀번호</legend>
                  <input
                    type="password"
                    name="password"
                    id
                    v-model="password"
                    @focus="onFocus($event)"
                    @blur="onBlur($event)"
                    required
                  />
                </fieldset>
              </div>
              <button type="submit" class="submit-button" @click.prevent="signup">회원가입</button>
            </form>
            <span class="check-form-type">
              이미 가입했다면?
              <a role="link" @click="changeForm('login')" tabindex="0">로그인</a>
            </span>
          </div>
          <a
            role="button"
            class="modal-close-button"
            @click="closeModal"
            aria-label="Close"
            tabindex="0"
          >
            <span class="a11y-hidden">close button</span>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {
  UPDATE_MODAL_STATE,
  CHANGE_MODAL_FORM,
  LOGIN,
  REGISTER,
  REFRESH_FORM
} from "@/store/actions.type";
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      email: null,
      password: null,
      username: null,
      focused: false
    };
  },
  computed: {
    ...mapGetters(["showModal", "modalType"]),
    ...mapState({
      errors: state => state.user.errors
    })
  },
  methods: {
    closeModal() {
      this.$store.dispatch(REFRESH_FORM);
      this.$store.dispatch(UPDATE_MODAL_STATE);
    },
    changeForm(type) {
      this.email = null;
      this.username = null;
      this.password = null;

      this.$store.dispatch(REFRESH_FORM);
      this.$store.dispatch(CHANGE_MODAL_FORM, type);
    },
    login() {
      this.$store
        .dispatch(LOGIN, {
          email: this.email,
          password: this.password
        })
        .then(() => {
          if (!this.errors) {
            this.closeModal();
          }
        });
    },
    signup() {
      this.$store
        .dispatch(REGISTER, {
          email: this.email,
          password: this.password,
          username: this.username
        })
        .then(() => {
          if (!this.errors) {
            this.closeModal();
          }
        });
    },
    onFocus(event) {
      // let parent = event.target.parentNode.parentNode;
      let parent = event.target.closest(".input-wrapper");
      parent.classList.add("focus");
    },
    onBlur(event) {
      let parent = event.target.closest(".input-wrapper");
      parent.classList.remove("focus");
    }
  },
  mounted() {
    window.addEventListener("keydown", event => {
      event.stopPropagation();

      if (event.keyCode === 27 && this.showModal === true) {
        this.closeModal();
      }
    });
  }
};
</script>