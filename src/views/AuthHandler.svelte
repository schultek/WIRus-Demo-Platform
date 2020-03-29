<script>

  import { onMount } from "svelte";
  import {router} from "@spaceavocado/svelte-router";

  import { parseQuery } from "../lib/utils";
  import { verifyToken } from "../lib/wirus-integration";
  import firebase from "../lib/firebase";

  onMount(async () => {

    let query = parseQuery(window.location.search);

    if (query.token) {
      await verifyToken(query.token)
        .then(token => {
          if (token) {
            return firebase
              .auth()
              .signInWithCustomToken(token)
              .then(() => $router.replace("/platform"));
          } else {
            $router.replace("/wirus");
          }
        })
        .catch((err) => {
          console.warn(err);
          $router.replace("/")
        });
    } else {
      $router.replace("/");
    }

  });
</script>
