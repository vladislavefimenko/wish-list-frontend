<!-- Модальное окно для обновления желания -->
<template>
  <div>
    <span>
      Вы действительно хотите удалить желание {{ this.wishTitle }}?
    </span>

    <div class="mt-4 text-center">
      <b-button type="submit" variant="primary" @click="deleteWish">Delete</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DeleteWishForm',
  data() {
    return {
      deleteWishData: {
        id: this.wishId,
      },
    };
  },

  props: {
    wishTitle: '',
    wishId: null,
  },

  methods: {
    deleteWish() {
      const path = 'http://localhost:5000/wishes/delete';
      axios.delete(path, { data: this.deleteWishData })
        .then(() => {
          this.message = 'Wish delete!';
          this.showMessage = true;
          this.$emit('updateWishesList', { message: this.message, status: true });
        })
        .catch((error) => {
          this.$emit('updateWishesList', { message: error, status: false });
        });
    },
  },
};
</script>
