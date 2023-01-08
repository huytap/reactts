import { PayloadAction } from "@reduxjs/toolkit";
import {all, call, fork, put, take, takeLatest } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";
import authApi from "api/authApi";
import { LoginSuccessPayload } from "./types";
import siteConfig from "configs/siteConfig";

function* handleLogin(payload: LoginPayload){
    try{
        console.log('Handle login', payload)    
        // localStorage.setItem(ACCESS_TOKEN, 'login_success');
        const responseLogin:LoginSuccessPayload = yield call(authApi.login, payload);
        if(responseLogin.status){
            localStorage.setItem('data' + siteConfig.appId, JSON.stringify(responseLogin.data));
        }
        // if(responseLogin)
        // yield put(authActions.loginSuccess(responseLogin));
    }catch(error){
        yield put(authActions.loginFailed);
    }
}
function* handleLogout(){
    localStorage.removeItem('data' + siteConfig.appId);
    console.log('Handle logout');
}
function* watchLoginFlow(){
    // const isLoggedIn = Boolean(localStorage.getItem(ACCESS_TOKEN));
    // console.log(isLoggedIn)
    // if(!isLoggedIn){
        const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
        yield call(handleLogin, action.payload);
    // }
    // yield take(authActions.logout.type);
    // yield call(handleLogout);
}
export default function* authSaga(){
    yield fork(watchLoginFlow);
}