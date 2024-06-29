import React from 'react';

const Signup = () => {
    return (
        <div>
            <form>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
                <input type='number' placeholder="Age" />
                <textarea placeholder="Address" />
                <input type="text" placeholder="Password" />
                <input type="text" placeholder="Confirm Password" />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;