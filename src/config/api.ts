export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export const API_ENDPOINTS = {
  LOGIN: "cms/sign-in",
  SEARCH_NFT: "/cms/manage/search-nft",
  SEARCH_COLLECTION: "/cms/manage/search-collection",
  SEARCH_USER: "/cms/manage/search-user",
  SEARCH_ACCOUNT: "/cms/manage/search-account",
  HANDLE_ACTIVE_NFT: "/cms/handle-active/nft",
  HANDLE_ACTIVE_COLLECTION: "/cms/handle-active/collection",
  HANDLE_ACTIVE_USER: "/cms/handle-active/user",
  HANDLE_VERIFY_COLLECTION: "/cms/handle-verify/collection",
  UPLOAD_IMAGE: "/common/upload-image",
  CREATE_ACCOUNT: "/cms/create-account",

  LAUNCHPAD: "/launchpad",
  CHECK_IS_SUBSCRIBED: "/launchpad/isSubscribed",
  SUBSCRIBE_ROUND_ZERO: "/launchpad/subscribe",
  NFT_CRAWL_INFO: "/nft/crawl-nft-info",
  SNAPSHOT: "/user/projects",

  SEARCH_ROUND:"/cms/launchpad/search-round",
  CREATE_ROUND:"/cms/launchpad/create-round",
  UPDATE_ROUND:"/cms/launchpad/update-round",
  DELETE_ROUND:"/cms/launchpad/round",
  ACCOUNT_DETAIL: "/cms/account/get-detail",
  UPDATE_ACCOUNT: "/cms/update-account",
  UPDATE_ROLES: "/cms/account/update-roles",
  ACCOUNT_ROLES: "/cms/account/get-roles",


};
