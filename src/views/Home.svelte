<script>
  import { router } from "@spaceavocado/svelte-router";

  const login = () => {
    $router.push("/login");
  };
  const signup = () => {
    $router.push("/signup");
  };
</script>

<style>
  h2 {
    margin-bottom: 40px;
  }
  button:first-child {
    margin-right: 10px;
  }
  .info {
    max-width: 240px;
  }
</style>

<div class="main">
  <div class="content-wrapper">
    <h2>Demo Platform</h2>
    <div>
      <button on:click={login}>Login</button>
      <button on:click={signup} class="secondary">Sign Up</button>
    </div>
  </div>
  <div class="info">
    Das ist die Demo einer Helfer-Platform, um zu zeigen, wie eine Platform mit
    der WIRus App integriert werden kann. Aktivitäten, die du über diese
    Platform machst werden automatisch in deiner App angezeigt und zu deinem
    Score hinzugefügt.
  </div>
</div>
