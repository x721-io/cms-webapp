export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export const API_ENDPOINTS = {
    LOGIN: 'cms/sign-in',

    SEARCH_NFT: '/cms/manage/search-nft',
    SEARCH_COLLECTION: '/cms/manage/search-collection',
    SEARCH_USER: '/cms/manage/search-user',
    SEARCH_ACCOUNT: '/cms/manage/search-account',

    HANDLE_ACTIVE_NFT: '/cms/handle-active/nft',
    HANDLE_ACTIVE_COLLECTION: '/cms/handle-active/collection',
    HANDLE_ACTIVE_USER: '/cms/handle-active/user',
    HANDLE_VERIFY_COLLECTION: '/cms/handle-verify/collection',

    UPLOAD_IMAGE: '/common/upload-image',
    UPLOAD_IMAGE_S3: '/common/upload-s3',

    SEARCH_ROUND: '/cms/launchpad/search-round',
    CREATE_ROUND: '/cms/launchpad/create-round',
    UPDATE_ROUND: '/cms/launchpad/update-round',
    DELETE_ROUND: '/cms/launchpad/round',

    SEARCH_PROJECT: '/cms/launchpad/search-project',
    CREATE_PROJECT: '/cms/launchpad/create-project',
    UPDATE_PROJECT: '/cms/launchpad/update-project',
    DELETE_PROJECT: '',

    OPTION_ROUND: '/cms/option/round',
    OPTION_COLLECTION: '/cms/option/collection',

    CREATE_ACCOUNT: '/cms/account/create-account',
    UPDATE_ACCOUNT: '/cms/account/update-account',
    ACCOUNT_DETAIL: '/cms/account/get-detail',
    
    UPDATE_ROLES: '/cms/account/update-roles',
    ACCOUNT_ROLES: '/cms/account/get-roles',
    
    RESET_PASSWORD: '/cms/account/reset-password',
    CHANGE_PASSWORD: '/cms/account/update-password',
    
    REFRESH_TOKEN: '/cms/refresh-token',
};
