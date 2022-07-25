<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Wishes List</h1>
        <hr>
        <br><br>
        <alert
          :variant="variant"
          :message="message"
          v-if="showAlertOnView"
        ></alert>
        <button
          type="button"
          class="btn btn-outline-primary btn-sm"
          v-b-modal.wish-add-modal
        >
          Create a wish
        </button>
        <br><br>


        <b-table-simple class="table table-hover">
          <b-thead>
            <b-tr>
              <b-th scope="col">Title</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(wish, index) in wishes" :key="index">
              <b-td v-b-modal.users-wish-modal @click="getWishData(wish)">{{ wish.title }}</b-td>
              <b-td class="text-right">
                <button
                  type="button"
                  class="btn btn-success btn-sm"
                  v-b-modal.wish-update-modal
                  @click="getWishData(wish)"
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-outline-dark btn-sm"
                  v-b-modal.wish-delete-modal
                  @click="getWishData(wish)"
                >
                  Delete
                </button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
    </div>

    <template>
      <b-modal
        id="wish-add-modal"
        title="Create a new wish"
        hide-footer
      >
        <AddWishForm
          @updateWishesList="updateWishesList"
          :wishes="wishes"
        />

        <alert
          class="mt-3"
          :variant="variant"
          :message="message"
          v-if="showAlertInModal"
        ></alert>
      </b-modal>
    </template>

    <template>
      <b-modal
        id="wish-update-modal"
        title="Update a wish"
        hide-footer
      >
        <UpdateWishForm
          @updateWishesList="updateWishesList"
          :wishTitle="wishTitle"
          :wishId="wishId"
        />

        <alert
          class="mt-3"
          :variant="variant"
          :message="message"
          v-if="showAlertInModal"
        ></alert>
      </b-modal>
    </template>

    <template>
      <b-modal
        id="wish-delete-modal"
        title="Delete a wish"
        hide-footer
      >
        <DeleteWishForm
          @updateWishesList="updateWishesList"
          :wishTitle="wishTitle"
          :wishId="wishId"
        />

        <alert
          class="mt-3"
          :variant="variant"
          :message="message"
          v-if="showAlertInModal"
        ></alert>
      </b-modal>
    </template>

    <template>
      <b-modal
        id="users-wish-modal"
        title="Users which choose this wish"
        size="lg"
        hide-footer
      >
        <UsersWishModal :wishId="wishId"/>
      </b-modal>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from '../components/Alert';
import AddWishForm from '../components/AddWishForm';
import UpdateWishForm from '../components/UpdateWishForm';
import DeleteWishForm from '../components/DeleteWishForm';
import UsersWishModal from '../components/UsersWishModal';

export default {
  name: 'Wishes',

  data() {
    return {
      wishes: [],
      message: '',
      variant: '',
      showAlertOnView: false,
      showAlertInModal: false,

      wishId: null,
      wishTitle: '',
    };
  },

  components: {
    UsersWishModal,
    DeleteWishForm,
    UpdateWishForm,
    AddWishForm,
    alert: Alert,
  },

  methods: {
    updateWishesList(event) {
      if (event.status === true) {
        this.getWishes();
        this.message = event.message;
        this.variant = 'success';
        this.showAlertOnView = true;
        this.$bvModal.hide('wish-add-modal');
        this.$bvModal.hide('wish-update-modal');
        this.$bvModal.hide('wish-delete-modal');
      } else {
        this.message = event.message;
        this.variant = 'danger';
        this.showAlertInModal = true;
      }
    },

    getWishes() {
      const path = 'http://localhost:5000/wishList';
      axios.get(path)
        .then((res) => {
          this.wishes = res.data.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },

    getWishData(wish) {
      this.wishId = wish.id;
      this.wishTitle = wish.title;
    },

  },

  mounted() {
    this.getWishes();
  },
};
</script>

<style>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
