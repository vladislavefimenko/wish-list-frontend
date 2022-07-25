<!-- Модальное окно для обновления данных пользователя -->
<template>
  <div>
    <b-form class="w-100">
      <b-form-group
        label="Firstname:"
      >
        <b-form-input
          type="text"
          v-model="updateUserForm.firstName"
          required
          placeholder="Enter firstname"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
        label="Lastname:"
      >
        <b-form-input
          type="text"
          v-model="updateUserForm.lastName"
          required
          placeholder="Enter lastname"
        >
        </b-form-input>
      </b-form-group>
    </b-form>

    <div class="mt-4 text-center">
      <b-button type="submit" variant="primary" @click="updateUser">Update</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateUserForm',
  data() {
    return {
      updateUserForm: {
        firstName: this.firstname,
        lastName: this.lastname,
        id: this.userId,
      },
    };
  },

  props: {
    firstname: '',
    lastname: '',
    userId: null,
  },

  methods: {
    updateUser() {
      const path = 'http://localhost:5000/users/edit';
      axios.post(path, this.updateUserForm)
        .then(() => {
          this.message = 'User updated!';
          this.showMessage = true;
          this.$emit('updateUserList', { message: this.message, status: true });
        })
        .catch((error) => {
          this.$emit('updateUserList', { message: error, status: false });
        });
    },
  },
};
</script>
