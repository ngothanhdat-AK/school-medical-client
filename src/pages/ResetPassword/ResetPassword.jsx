import React from 'react'
import {Eye, EyeOff} from "lucide-react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <>
    <div>
    <h2>Reset Password</h2>
        <form action="">
            <div
                className="login_form__eye"
                onClick={() => setShowPassword(!showPassword)}
                style={{cursor: "pointer"}}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            <div>
                <label htmlFor=""> Current Password:</label>               
                <input type={showPassword ? "text" : "password"} name="currentPassword" placeholder='Enter current password' required />
            </div>
            <div>
                <label htmlFor=""> New Password:</label>              
                <input type={showPassword ? "text" : "password"} name="newPassword" placeholder='Enter new password' required />
            </div>
            <div>
                <label htmlFor=""> Confirm New Password:</label>           
                <input type={showPassword ? "text" : "password"} name="confirmNewPassword" placeholder='Confirm new password' required />
            </div>
            <div>
                <input type="checkbox" name="terms" required />
                <label htmlFor="terms">confirm password</label>
            </div>
            <button type="submit">Update</button>
        </form>
  </div>
    </>
  )
}

export default ResetPassword
