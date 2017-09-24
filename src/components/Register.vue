  <template>
    <div class="register">
      <h1> {{title}}</h1>
      <h1 v-if="error">{{errorMsg}}</h1>
      <form v-on:submit="register" action="#">
        <input type="text" v-model="loginDetails.username" name="name" placeholder="Name">
        <input type="email" v-model="loginDetails.email" name="email" placeholder="email">
        <input type="password" v-model="loginDetails.password" name="secondName" placeholder="password">
        <input type="password" v-model="loginDetails.passwordValidation" name="secondName" placeholder="retype password">
        <div class="buttons">
          <a href="#/login" class="specialBtn">Back</a>
          <input type="submit" value="Register">
        </div>

      </form>
    </div>
  </template>

  <script>
/* eslint-disable */
  export default {

    name: 'Registration',
    data() {
      return {
        title: 'Registration',
        loginDetails: {},
        error: false,
        errorMsg: '',

      };
    },
    sockets: {
      registrationAccepted(data) {
        console.log(data);
        console.log('registrationAccepted');
      },
      registrationDeclined(data) {
        console.log(data);
        console.log('registrationDecliened');
      },
    },
    methods: {
      register: function(e) {
        e.preventDefault();
        if (this.loginDetails.password !== this.loginDetails.passwordValidation) {
          this.error = true;
          this.errorMsg = "Password validation";
        }
        else {
          if (this.error) this.error = false;
          if (this.errorMsg !== '') this.errorMsg = '';
          this.$socket.emit('register', this.loginDetails);
        }
      },
    },
    created() {

    },
  };

  </script>


  <style scoped>
    .login{
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    form * {
      margin: 10px;
      min-width: 200px;
    }

    .login ul {
      list-style: none;
    }

  </style>
