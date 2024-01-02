import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async () => {
        let emailError = '';
        let passwordError = '';

        // Simple validation
        if (!email) {
            emailError = '*Email should not be empty';
        }
        if (!password) {
            passwordError = '*Password should not be empty';
        }

        // Update error states for both email and password
        setError({
            email: emailError,
            password: passwordError
        });

        if (!emailError && !passwordError) {
            try {
                // Make POST request using axios
                const response = await axios.post('http://localhost:3000/login', {
                    email,
                    password
                });
                
                if (response.status === 200) {
                    // Assuming the API responds with a token
                    const { token } = response.data;

                    // Store the token in localStorage
                    localStorage.setItem('loginToken', token);

                    // Redirect to '/home'
                    navigate('/home');
                }
            } catch (error) {
                // Handle error responses from the API
                console.error('Error:', error);
                // You might set an appropriate error state here based on the API response
            }
        }
    };
    return (
        <>
            <div className="flex justify-center w-[100%]">
                <div className="relative top-40">
                    <h1 className="Signin">Sign in</h1>
                    <div className='mb-4'>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="email px-1 w-[300px] h-[45px]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        {error.email && <p className="text-[red] ">{error.email}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password "
                            className="password px-1 w-[300px] h-[45px]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        {error.password && <p className="text-[red]">{error.password}</p>}
                    </div>
                    <div className="form-chec my-1">
                        <label className="form-check-label"><input type="checkbox" className="" name="" id="" />Remember me</label>
                    </div>
                    <button className="primary btn h-[43px]" onClick={handleSubmit}>
                        Login
                    </button>
                </div>
                <div className='Vector'>

                </div>
            </div>
        </>
    );
};

export default Login;
