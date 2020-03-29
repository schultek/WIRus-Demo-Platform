<script>
  import { testEmail } from "../lib/utils";
  import {router} from "@spaceavocado/svelte-router";
  import { connectExistingUser, connectNewUser } from "../lib/wirus-integration";
  import firebase from "../lib/firebase";

  $: email = "";
  $: password = "";
  $: emailValid = true;
  $: credValid = true;

  const connectExisting = () => {
    if (!testEmail(email)) {
      emailValid = false;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(credential => credential.user.getIdToken())
        .then(token => connectExistingUser(token))
        .then(() => $router.push("/platform"))
        .catch(err => {
          console.warn(err);
          credValid = false;
        });
    }
  };

  const connectNew = () => {
    connectNewUser()
      .then(token => firebase.auth().signInWithCustomToken(token))
      .then(() => $router.push("/platform"))
      .catch(err => {
        console.warn(err);
      });
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
  <title>Demo Platform & WIRus</title>
</svelte:head>

<div class="main">
  <div class="content-wrapper">
    <h2>Verbinde deinen <br/> WIRus Account</h2>

    <input
      bind:value={email}
      placeholder="Email"
      class:error={!emailValid || !credValid} />
    <input
      bind:value={password}
      placeholder="Passwort"
      type="password"
      class:error={!credValid} />
    <button on:click={connectExisting} style="margin-top: 20px">
      Mit bestehendem <br/> Account verknüpfen.
    </button>


    <div class="divider">
      <span>ODER</span>
    </div>

    <button on:click={connectNew} class="secondary">
      Ich habe keinen <br/> Demo-Platform Account
    </button>

  </div>

  <div class="info">
    Wenn du aus der WIRus App eine Platform hinzufügen möchtest hast du die Wahl. Ein bestehendes Konto auf
    der Platform mit deinem WIRus Account verknüpfen, oder automatisch ein neues Konto anlegen lassen. <br/>
    Wenn du ein bestehendes Konto verbindest werden alle deine bereits erledigten Aktionen mit der WIRus App
    synchronisiert und keine Punkte gehen verloren.
  </div>
</div>
