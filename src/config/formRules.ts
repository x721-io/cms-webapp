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
    required: "Please input description",
  },
};

// Create Round
export const formRulesCreateRound = {
  name: {
    required: "Please input round name",
  },
  description: {
    required: "Please input description",
  },
  instruction: {
    required: "Please input instruction",
  },
  type: {
    required: "Please input type round",
  },
  totalNFT: {
    required: "Please input total nft",
  },
  price: {
    required: "Please input price",
  },
  start: {
    required: "Please input time start",
  },
  end: {
    required: "Please input time end",
  },
  startClaim: {
    required: "Please input start claim",
  },
  stackingEnd: {
    required: "Please input stacking end",
  },
  quantity: {
    required: "Please input quantity",
  },
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
    required: "Please input description",
  },
  discord: {
    required: "Please input total discord",
  },
  facebook: {
    required: "Please input facebook",
  },
  instagram: {
    required: "Please input instagram",
  },
  twitter: {
    required: "Please input total twitter",
  },
  telegram: {
    required: "Please input telegram",
  },
  address: {
    required: "Please input address",
  },
  organization: {
    required: "Please input organization",
  },
  collectionAddress: {
    required: "Please input collectionAddress",
  },
  logo: {
    required: "Please input logo",
  },
};

// Create Project
export const formRulesCreateProject = {
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
    required: "Please input description",
  },
  discord: {
    required: "Please input total discord",
  },
  facebook: {
    required: "Please input facebook",
  },
  instagram: {
    required: "Please input instagram",
  },
  twitter: {
    required: "Please input total twitter",
  },
  telegram: {
    required: "Please input telegram",
  },
  address: {
    required: "Please input address",
  },
  organization: {
    required: "Please input organization",
  },
  collectionAddress: {
    required: "Please input collectionAddress",
  },
  logo: {
    required: "Please input logo",
  },
  rounds: [
    {
      addressRounds: {
        required: "Please input addressRounds",
      },
      startRounds: {
        required: "Please input startRounds",
      },
      endRounds: {
        required: "Please input endRounds",
      },
      roundId: {
        required: "Please input roundId",
      },
      stakeBeforeRounds: {
        required: "Please input stakeBeforeRounds",
      },
      claimableStartRounds: {
        required: "Please input claimableStartRounds",
      },
      maxPerWalletRounds: {
        required: "Please input maxPerWalletRounds",
      },
      priceRounds: {
        required: "Please input priceRounds",
      },
      totalNfttRounds: {
        required: "Please input totalNfttRounds",
      },
      instructionRounds: {
        required: "Please input instructionRounds",
      },
      requiredStakingRounds: {
        required: "Please input requiredStakingRounds",
      },
      claimableIdsRounds: {
        required: "Please input claimableIdsRounds",
      },
    },
  ],
};
