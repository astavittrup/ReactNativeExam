class User {
    constructor(
      public id: string,
      public firstname: string,
      public lastname: string,
      public email: string,

    ) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
    }
  }
  
  export default User;