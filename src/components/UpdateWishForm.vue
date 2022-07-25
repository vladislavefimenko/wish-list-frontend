<!-- Модальное окно для обновления желания -->
<template>
  <div>
    <b-form class="w-100">
      <b-form-group
        label="Title:"
        label-for="form-title-input"
      >
        <b-form-input
          type="text"
          v-model="updateWishForm.title"
          required
          placeholder="Enter title"
        >
        </b-form-input>
      </b-form-group>
    </b-form>

    <div class="mt-4 text-center">
      <b-button type="submit" variant="primary" @click="updateWish">Update</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateWishForm',
  data() {
    return {
      updateWishForm: {
        title: this.wishTitle,
        id: this.wishId,
      },
    };
  },

  props: {
    wishTitle: '',
    wishId: null,
  },

  methods: {
    updateWish() {
      const path = 'http://localhost:5000/wishes/edit';
      axios.post(path, this.updateWishForm)
        .then(() => {
          this.message = 'Wish updated!';
          this.showMessage = true;
          this.$emit('updateWishesList', { message: 'Wish update!', status: true });
        })
        .catch((error) => {
          this.$emit('updateWishesList', { message: error, status: false });
        });
    },
  },
};
</script>
