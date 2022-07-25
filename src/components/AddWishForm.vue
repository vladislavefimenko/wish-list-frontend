<!-- Модальное окно для добавления нового желания пользователя-->
<template>
  <div>
    <b-form class="w-100">
      <b-form-group
        label="Firstname:"
        label-for="form-title-input"
      >
        <b-form-input
          type="text"
          v-model="addWishForm.firstName"
          required
          placeholder="Enter firstname"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
        label="Lastname:"
        label-for="form-title-input"
      >
        <b-form-input
          type="text"
          v-model="addWishForm.lastName"
          required
          placeholder="Enter lastname"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
        label="Wish:"
      >
        <b-form-select
          v-model="addWishForm.wish"
          :options="this.wishes"
          value-field="id"
          text-field="title"
        />
      </b-form-group>
    </b-form>

    <div class="mt-4 text-center">
      <b-button type="submit" variant="primary" @click="addWish">Create</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddWishForm',

  data() {
    return {
      addWishForm: {
        firstName: '',
        lastName: '',
        wish: null,
      },
    };
  },

  props: {
    wishes: [],
  },

  methods: {
    addWish() {
      const path = 'http://localhost:5000/addWish';
      axios.post(path, this.addWishForm)
        .then(() => {
          this.message = 'Wish added!';
          this.showMessage = true;
          this.$emit('updateWishesList', { message: 'Wish for user added!', status: true });
        })
        .catch((error) => {
          this.$emit('updateWishesList', { message: error, status: false });
        });
    },
  },
};
</script>
