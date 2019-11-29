<template>
  <header>
    <nav>
      <div class="container">
        <router-link :to="{ name: 'home' }" class="nav-logo">BROTE</router-link>

        <ul>
          <li>
            <a role="button" class="button-signin" arial-label="Login">로그인</a>
          </li>
          <li>
            <a role="button" class="button-signup" arial-label="Signup">시작하기</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
export default {};
</script>
