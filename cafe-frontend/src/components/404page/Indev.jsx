import './index.css';
import { Link } from 'react-router-dom';

const Indev = () => {
    return (
        <div class="container h-100">
            <div class="h-100">
                <div class="span12 d-flex justify-content-center align-items-center text-center" style={{ marginTop: "18%" }}>
                    <div class="hero-unit center ">
                        <h1>This page is under development<small><font face="Tahoma" color="red"> DEVELOPMENT</font></small></h1>
                        <br />
                        <p>We will finish this page soon!!. Use your browsers <b>Back</b> button to navigate to the page you have prevously come from</p>
                        <p><b>Or you could just press this neat little button:</b></p>
                        <Link to="/signin">
                            <div class="btn btn-large btn-info"><i class="icon-home icon-white"></i> Take Me Home</div>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Indev;