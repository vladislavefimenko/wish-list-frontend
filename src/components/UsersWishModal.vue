<!-- Модальное окно для добавления нового желания пользователя-->
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <b-table-simple class="table table-hover">
          <b-thead>
            <b-tr>
              <b-th scope="col">Name</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(user, index) in users" :key="index">
              <b-td>{{ user.fullName }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UsersWishModal',

  data() {
    return {
      users: [],
      Form: {
        id: this.wishId,
      },
    };
  },

  props: {
    wishId: null,
  },

  methods: {
    getUsers() {
      const path = 'http://localhost:5000/users-wish';
      axios.post(path, this.Form)
        .then((res) => {
          this.users = res.data.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },

  mounted() {
    this.getUsers();
  },
};
</script>
