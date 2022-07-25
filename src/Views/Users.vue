<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>User List</h1>

        <alert
          :variant="variant"
          :message="message"
          v-if="showAlertOnView"
        ></alert>

        <b-table-simple class="table table-hover">
          <b-thead>
          <b-tr>
            <b-th scope="col">Name</b-th>
            <b-th></b-th>
          </b-tr>
          </b-thead>
          <b-tbody>
          <b-tr v-for="(user, index) in users" :key="index">
            <b-td>{{ user.firstName + " " + user.lastName }}</b-td>
            <b-td class="text-right">
              <button
                type="button"
                class="btn btn-success btn-sm"
                v-b-modal.user-update-modal
                @click="getUserData(user)"
              >
                Update
              </button>
            </b-td>
          </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
    </div>

    <template>
      <b-modal
        id="user-update-modal"
        title="Update a user"
        hide-footer
      >
        <UpdateUserForm
          @updateUserList="updateUserList"
          :firstname="firstname"
          :lastname="lastname"
          :userId="userId"
        />

        <alert
          class="mt-3"
          :variant="variant"
          :message="message"
          v-if="showAlertInModal"
        ></alert>
      </b-modal>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from '../components/Alert';
import UpdateUserForm from '../components/UpdateUserForm';

export default {
  name: 'Users',

  data() {
    return {
      users: [],
      message: '',
      variant: '',
      showAlertOnView: false,
      showAlertInModal: false,

      firstname: '',
      lastname: '',
      userId: null,
    };
  },

  components: {
    UpdateUserForm,
    alert: Alert,
  },

  methods: {
    updateUserList(event) {
      if (event.status === true) {
        this.getUsers();
        this.message = event.message;
        this.variant = 'success';
        this.showAlertOnView = true;
        this.$bvModal.hide('user-update-modal');
      } else {
        this.message = event.message;
        this.variant = 'danger';
        this.showAlertInModal = true;
      }
    },

    getUsers() {
      const path = 'http://localhost:5000/userList';
      axios.get(path)
        .then((res) => {
          this.users = res.data.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },

    getUserData(user) {
      this.firstname = user.firstName;
      this.lastname = user.lastName;
      this.userId = user.id;
    },

  },

  mounted() {
    this.getUsers();
  },
};
</script>

<style>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
