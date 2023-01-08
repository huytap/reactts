export interface LoginSuccessPayload{
    'status': boolean,
    'data': {
        'access_token':string,
        'expires_at': number,
        'token_type': string
    }
}
export interface LoginFailedPayload{
    'message': string
}