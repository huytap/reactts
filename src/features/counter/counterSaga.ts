import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";

function* log(action: PayloadAction){
    console.log(action);
}
function* handleIncrementSaga(action: PayloadAction<number>){
    //waiting 1s
    delay(2000);
    //dispatch action success
    console.log('Waiting done, dispatch action')
    yield put(incrementSagaSuccess(action.payload));
} 
export default function* counterSaga(){
    // console.log('Counter saga');
    // yield takeEvery(incrementSaga.toString(), handleIncrementSaga)
    yield takeLatest(incrementSaga.toString(), handleIncrementSaga)
}