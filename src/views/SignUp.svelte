<script>
  import { testEmail } from "../lib/utils";
  import { router } from "@spaceavocado/svelte-router";
  import firebase from "../lib/firebase";
  import { signInWithWIRus } from "../lib/wirus-integration";

  $: email = "";
  $: password = "";
  $: emailValid = true;
  $: credValid = true;

  const signup = () => {
    if (!testEmail(email)) {
      emailValid = false;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => $router.push("/platform"))
        .catch(err => {
          console.warn(err);
          credValid = false;
        });
    }
  };
</script>

<style>
  input {
    margin-bottom: 10px;
  }

  button {
    width: 100%;
  }

  h2 {
    margin-bottom: 30px;
  }
</style>

<svelte:head>
  <title>Sign Up</title>
</svelte:head>

<div class="main">
  <div class="content-wrapper">
    <h2>Demo Platform</h2>

    <form>
      <input
        bind:value={email}
        placeholder="Email"
        class:error={!emailValid || !credValid}
        autocomplete="email" />
      <input
        bind:value={password}
        placeholder="Passwort"
        type="password"
        class:error={!credValid}
        autocomplete="new-password" />
    </form>
    <button on:click={signup} style="margin-top: 20px">Sign Up</button>

    <div class="divider">
      <span>ODER</span>
    </div>

    <button on:click={signInWithWIRus} class="secondary">
      SignIn mit WIRus
    </button>
  </div>

  <div class="info">
    Erstelle einen Account bei der Demo Platform oder nutze den "SignIn mit
    WIRus" Button. Dadurch kannst du dich mit nur einem Konto auf allen
    Partner-Platformen anmelden.
    <br />
    Wenn du dich zum ersten mal mit deinem WIRus Account auf der Platform
    anmeldest, wird automatisch ein Konto für dich erstellt.
  </div>
</div>
