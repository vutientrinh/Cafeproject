import React from 'react';
import { Link } from 'react-router-dom';
import welcome from '../assets/images/bg.jpg';
import intro from '../assets/images/intro.jpg';

function VisitPage() {
    return (
        <div className="VisitPage" style={{
            backgroundImage: `url(${welcome})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
        }}>

            <section class="page-section clearfix">
                <div class="container">
                    <div class="intro pt-5">
                        <img class="intro-img img-fluid mb-3 mb-lg-0 rounded" src={intro} alt="..." />
                        <div class="intro-text left-0 bg-faded p-5 flex-wrap rounded align-items-center align-content-stretch justify-space-between" style={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                userSelect: 'none'
                            }
                        }>
                            <h2 class="section-heading mb-4">
                                <span class="section-heading-upper">Fresh Coffee</span>
                                <span class="section-heading-lower">Worth Drinking</span>
                            </h2>
                            <p class="mb-3">Every cup of our quality artisan coffee starts with locally sourced, hand picked ingredients. Once you try it, our coffee will be a blissful addition to your everyday morning routine - we guarantee it!</p>
                            <Link to="/manager">
                                <div class="intro-button mx-auto">
                                    <a class="btn btn-xl w-50 d-flex justify-content-center align-items-center fw-bold" style={{ height: '50px', background: '#fccb90'}} href="#!">VISIT US TODAY!
                                    </a>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section >

        </div >
    );
}

export default VisitPage;
