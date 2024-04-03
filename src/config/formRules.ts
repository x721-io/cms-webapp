// Login
export const formRulesLogin = {
  username: {
    required: "Please input username",
    minLength: {
      value: 6,
      message: "Username must have at least 6 characters",
    },
    maxLength: { value: 25, message: "Username cannot exceed 25 characters" },
  },
  password: {
    required: "Please input your password",
    minLength: {
      value: 6,
      message: "Password must have at least 6 characters",
    },
  },
};

// Update Round 
export const formRulesRound = {
  id: {},
  name: {
    required: "Please input round name",
  },
  type: {
    required: "Please input type round",
  },
  description: {
    required: "Please input description"
  }
};

// Create Round 
export const formRulesCreateRound = {
  name: {
    required: "Please input round name",
  },
  type: {
    required: "Please input type round",
  },
  description: {
    required: "Please input description"
  }
};

// Update Round 
export const formRulesUpdateProject = {
  banner: {
    required: "Please input banner",
  },
  name: {
    required: "Please input name",
  },
  collection: {
    required: "Please input collection",
  },
  description: {
    required: "Please input description"
  },
  discord: {
    required: "Please input total discord"
  },
  facebook: {
    required: "Please input facebook",
  },
  instagram: {
    required: "Please input instagram"
  },
  twitter: {
    required: "Please input total twitter"
  },
  telegram: {
    required: "Please input telegram",
  },
  address: {
    required: "Please input address",
  },
  organization: {
    required: "Please input organization"
  },
  collectionId: {
    required: "Please input collectionId"
  },
  logo: {
    required: "Please input logo"
  }
};
