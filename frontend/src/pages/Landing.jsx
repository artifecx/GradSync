import React, { useEffect, useRef } from "react";
import Wrapper from "../assets/css/wrappers/LandingPage";
import { Link, useNavigate } from "react-router-dom";
import photo from "../assets/media/LandingPage/hero.png";
import Navbar from "../components/shared/Navbar";
import PopularCategory from "../components/Home Page/PopularCategory";
import HowWorks from "../components/Home Page/HowWorks";
import Team from "../components/Home Page/Team";
import Brands from "../components/Home Page/Brands";
import Testimonial from "../components/Home Page/Testimonial";
import { useUserContext } from "../context/UserContext";
import Loading from "../components/shared/Loading";

const Landing = () => {
    const navbarRef = useRef(null);
    const heroRef = useRef(null);
    const { user, userLoading } = useUserContext();
    let navigate = useNavigate();

    useEffect(() => {
        // if(!userLoading){
        //     if(user?.role === "admin" || user?.role === "recruiter"){
        //         navigate("/dashboard");
        //     }
        // }
        
        const navbarHeight = navbarRef.current.getBoundingClientRect().height;
        heroRef.current.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
    }, []);

    return (
        <>
            <Navbar navbarRef={navbarRef} />
            <Wrapper ref={heroRef}>
                <div className="hero-content">
                    <div className="text-content">
                        <h1>
                            Discover jobs that suits your <span className="fancy">interest & skills </span> 
                            Today!
                        </h1>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Illo perferendis dignissimos eligendi voluptas
                            exercitationem, eius aut mollitia quasi nisi
                            voluptatem similique, tempore totam, odit
                            repellendus non. Dolores eos animi recusandae.
                        </p>
                        <div className="btn-grp">
                            <Link className="btn" to="/all-jobs">
                                Job Search
                            </Link>
                        </div>
                    </div>
                    <div className="placeholder">
                        <img src={photo} alt="job viva photo" />
                    </div>
                </div>
            </Wrapper>
            {/* <div>
            <PopularCategory/>
            <HowWorks/>
            <Team/>
            <Testimonial/>
            <Brands/>
            </div> */}
        </>
    );
};

export default Landing;
