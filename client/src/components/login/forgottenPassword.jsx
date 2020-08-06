import React, {useState} from "react"
import {NavLink} from "react-router-dom"
// import userIcon from "../../user-image.svg"
import "./style.css";

const ForgottenPassword = () => {
    const [email, setEmail] = useState('')
    const requestForgottenPassword = () => {
        fetch("http://localhost:9090/api/users/forgottenPassword", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            email
          })
        }).then(res => {
          if (res.status === 200) {
            console.log(res)
          }
        });
      }
    return (
        <div className="login-base-container">
            <div className="header">Write your email so we can send you a reset password link</div>
            <div className="content">
                <div className="login-form">
                    <div className="form-group">
                        <label htmlFor="password">Email</label>
                        <input 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="footer">
              <button type="button" onClick={requestForgottenPassword} className="btn"><NavLink className="forgotPass" to="/emailSent">Send email</NavLink></button>
            </div>
        </div>
    )
}
export default ForgottenPassword