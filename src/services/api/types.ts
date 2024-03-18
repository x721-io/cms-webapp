
/********** =========== Queries & Params for Api call ========== ***********/
export namespace APIParams {
    export interface Login {
        username: string | undefined;
        password: string | undefined;
    }
}

/********** =========== API Response types ========== ***********/
export namespace APIResponse {
    export interface Login {
        accessToken: string;
        accessTokenExpire: number;
        refreshToken: string;
        refreshTokenExpire: number;
        userId: string;
    }
}