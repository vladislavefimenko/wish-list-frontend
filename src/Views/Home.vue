<template>
  <div class="container text-center">
    <h1 class="mb-5">Wish List Service</h1>

    <div class="row">
      <div class="col-6">
        <b-button
          class="btn btn-dark"
          to="/users"
        >
          Users
        </b-button>
      </div>

      <div class="col-6">
        <b-button
          class="btn btn-dark"
          to="/wishes"
        >
          Wishes
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
<style>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
