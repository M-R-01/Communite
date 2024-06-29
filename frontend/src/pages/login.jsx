import React from "react";

const Login = () => {
    return (
        <div>
            <form>
                <input type="text" placeholder="email" required />
                <input type="password" placeholder="password" required />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login;