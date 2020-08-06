import React, {useState} from "react"
import {useHistory} from "react-router-dom"
// import userIcon from "../../user-image.svg"
import "./style.css";

export default function ResetPassword (props) {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const token = props.match.params.token
  
  const requestResetPassword = () => {
      fetch("http://localhost:9090/api/users/changePassword", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          username,
          password,
          repeatPassword,
          token
        })
      }).then(res => {
        if (res.status === 200) {
          console.log(res)
          history.push("/login")
        }
      });
    }
    return (
        <div className="login-base-container">
            <div className="header">Reset password</div>
            <div className="content">
                <div className="login-form">
                <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                        type="text" 
                        name="username" 
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="repeatPassword">Repeat password</label>
                        <input 
                        type="password" 
                        name="repeatPassword" 
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="footer">
              <button type="button" onClick={requestResetPassword} className="btn">Save</button>
            </div>
        </div>
    )
}