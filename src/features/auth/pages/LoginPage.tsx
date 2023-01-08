import { useAppDispatch } from 'app/hooks';
import React, {ChangeEvent, useState} from 'react';
import { authActions, LoginPayload } from '../authSlice';

export interface ILoginPageProps {
}

export default function LoginPage (props: ILoginPageProps) {
  const initialState = {
    email: '',
    password: ''
  }
  const [formLogin, setFormLogin] = useState<LoginPayload>(initialState);
  const dispatch = useAppDispatch();
  const handleLoginClick = () => {
    dispatch(authActions.login(formLogin))
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormLogin({...formLogin, [name]: value});
  }
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <b>Admin</b>System
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
              <div className="input-group mb-3">
                <input type="email" name="email" onChange={handleInputChange} className="form-control" placeholder="Email" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" name="password" onChange={handleInputChange} className="form-control" placeholder="Password" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="button" onClick={handleLoginClick} className="btn btn-primary btn-block">Sign In</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
