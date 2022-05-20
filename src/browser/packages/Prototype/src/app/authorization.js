import { STDIN } from "@utils/stdin";
import { Repository } from "./repository";
import { User } from "./user";

export const Account = function Account(data) {
  User.call(this, data);

  const props = {
    email: null,
    password: null,
    role: null,
    permissions: null,
  };

  for (const key of Object.keys(props)) {
    this[key] = data[key] ?? props[key];
  }
};

Account.prototype = Object.create(User.prototype, {
  constructor: {
    value: Account,
  },
});

export const SuperAdmin = function SuperAdmin(data = {}) {
  Account.call(this, {
    ...data,
    role: "SuperAdmin",
    permissions: ["WRITE", "READ"],
  });
};

SuperAdmin.prototype = Object.create(Account.prototype, {
  constructor: {
    value: SuperAdmin,
  },
});

export const Admin = function Admin(data = {}) {
  Account.call(this, {
    ...data,
    role: "Admin",
    permissions: ["READ"],
  });
};

Admin.prototype = Object.create(Account.prototype, {
  constructor: {
    value: Admin,
  },
});

export const Guest = function Guest() {
  Account.call(this, {
    role: "Guest",
    permissions: [],
  });
};

Guest.prototype = Object.create(Account.prototype, {
  constructor: {
    value: Guest,
  },
});

export const Authorization = (() => {
  const _private = new WeakMap();

  function Authorization() {
    const repository = new Repository("accounts");

    const su = new SuperAdmin({
      email: "su@example.com",
      password: "su",
      firstName: "Admin",
      lastName: "Admin",
    });

    repository.add(su);

    _private.set(this, {
      repository,
    });
  }

  Authorization.prototype = {
    constructor: Authorization,

    signIn() {
      const email = STDIN.string("Enter registered email", (value) => !value.includes("@"), true);
      const password = STDIN.string("Enter password", void 0, true);

      const user = this.findUserByEmail(email);

      if (user && user.password === password) {
        return user;
      }

      if (confirm("User not found, want to re-try?")) {
        return this.signIn();
      }

      if (confirm("Do you want to register a new account")) {
        return this.signUp();
      }

      return new Guest();
    },

    signUp() {
      const account = new Admin();

      const MIN_LENGTH = 9;

      account.email = STDIN.string("Enter email", (value) => !value.includes("@") || this.hasUser(value), true);
      account.password = STDIN.string(
        `Enter password: min length ${MIN_LENGTH} symbols`,
        (value) => value.length < MIN_LENGTH,
        true
      );

      const MIN_NAME_LENGTH = 5;
      const MAX_NAME_LENGTH = 20;

      const nameValidator = function (value) {
        return value < MIN_NAME_LENGTH || value > MAX_NAME_LENGTH;
      };

      account.firstName = STDIN.string(
        `Enter your name pls, min length: ${MIN_NAME_LENGTH}, max length: ${MAX_NAME_LENGTH}`,
        nameValidator
      );

      const MIN_SURNAME_LENGTH = 5;
      const MAX_SURNAME_LENGTH = 20;

      const surnameValidator = function (value) {
        return value < MIN_SURNAME_LENGTH || value > MIN_SURNAME_LENGTH;
      };

      account.lastName = STDIN.string(
        `Enter your surname pls, min length: ${MIN_SURNAME_LENGTH}, max length: ${MAX_SURNAME_LENGTH}`,
        surnameValidator
      );

      _private.get(this).repository.add(account);

      return account;
    },

    grant(email, role) {
      const index = _private.get(this).repository.findIndex((user) => user.email === email);

      if (index < 0) {
        console.log("Operation forbidden, user not found");
      }

      let newUser;

      switch (role) {
        case "SuperAdmin":
          newUser = new SuperAdmin();
          break;
        case "Admin":
          newUser = new Admin();
          break;
        case "User":
          newUser = new Guest();
          break;
        default:
          newUser = null;
          break;
      }

      if (newUser) {
        _private.get(this).repository.replace(index, newUser);
      }
    },

    hasUser(email) {
      return _private.get(this).repository.has((user) => user.email === email);
    },

    findUserByEmail(email) {
      return _private.get(this).repository.find((user) => user.email === email);
    },
  };

  return Authorization;
})();
