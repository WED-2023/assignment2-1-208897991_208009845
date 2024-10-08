<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">

      <!--  Username -->
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username must contain only alphabetic characters
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- First Name -->
<b-form-group
  id="input-group-firstname"
  label-cols-sm="3"
  label="First Name:"
  label-for="firstname"
>
  <b-form-input
    id="firstname"
    v-model="$v.form.firstname.$model"
    type="text"
    :state="validateState('firstname')"
  ></b-form-input>
  <b-form-invalid-feedback v-if="!$v.form.firstname.required">
    First Name is required
  </b-form-invalid-feedback>
  <b-form-invalid-feedback v-if="!$v.form.firstname.alpha">
    First Name must contain only alphabetic characters
  </b-form-invalid-feedback>
</b-form-group>

<!-- Last Name -->
<b-form-group
  id="input-group-lastname"
  label-cols-sm="3"
  label="Last Name:"
  label-for="lastname"
>
  <b-form-input
    id="lastname"
    v-model="$v.form.lastname.$model"
    type="text"
    :state="validateState('lastname')"
  ></b-form-input>
  <b-form-invalid-feedback v-if="!$v.form.lastname.required">
    Last Name is required
  </b-form-invalid-feedback>
  <b-form-invalid-feedback v-if="!$v.form.lastname.alpha">
    Last Name must contain only alphabetic characters
  </b-form-invalid-feedback>
</b-form-group>

      <!--  Email -->
      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Email must be valid
        </b-form-invalid-feedback>
      </b-form-group>

      <!--  Country -->
      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!--  Password -->
      <b-form-group
        id="input-group-password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="$v.form.password.$error">
          Password should be 5-10 characters long
        </b-form-invalid-feedback>
      </b-form-group>

      <!--  Confirm Password -->
      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.confirmedPassword.sameAsPassword">
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- button -->
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="loginpage"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email as emailValidator
} from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstname: {
        required,
        alpha
      },
      lastname: {
        required,
        alpha
      },
      email: {
        required,
        email: emailValidator
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await axios.post(
          this.$root.store.server_domain + "/register",
          {
            username: this.form.username,
            firstname: this.form.firstname, 
            lastname: this.form.lastname,  
            password: this.form.password,
            country: this.form.country,
            email: this.form.email
          }
        );
        this.$router.push("/loginpage");
      } catch (err) {
        this.form.submitError = err.response?.data?.message || "Register failed";
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  margin-bottom: 1rem;
}
</style>
