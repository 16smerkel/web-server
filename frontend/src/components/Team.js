import React from 'react';
import '../App.css'

function Team()
{

    return(
        <div className ="center">
            <br /><br />
            <h1>Meet the Team</h1>

            <div >
                <div className = "inlign"> 
                    <div className = "center">
                        <h1 className = 'circleTeam' ><img className="imageSize"src='/assets/coreyAbout.png' alt="corey"/></h1>
                        <h2>Corey</h2>
                        <h2>API</h2>
                    </div>
                </div>

                <div className = "inlign"> 
                    <div className = "center">
                        <h1 className = 'circleTeam' ><img className="imageSize"src='/assets/luigiAbout.png'alt="luigi"/></h1>
                        <h2>Luigi</h2>
                        <h2>Mobile App</h2>
                    </div>
                </div>
                <div className = "inlign"> 
                    <div className = "center">
                        <h1 className = 'circleTeam' > <img className="imageSize"src='/assets/bellaAbout.png' alt="bella"/></h1>
                        <h2>Bella</h2>
                        <h2>Website</h2>
                    </div>
                </div>
            </div>

            
          
            <div >
                <div className = "inlign"> 
                    <div className = "center">
                        <h1 className = 'circleTeam' ><img className="imageSize"src='/assets/owenAbout.png' alt="owen"/> </h1>
                        <h2>Owen</h2>
                        <h2>API/Databse</h2>
                    </div>
                </div>

                <div className = "inlign"> 
                    <div className = "center">
                        <h1 className = 'circleTeam' ><img className="imageSize"src='/assets/rebeccaAbout.png' alt="rebeca"/> </h1>
                        <h2>Rebeca</h2>
                        <h2>Project Manager</h2>
                    </div>
                </div>
                <div className = "inlign"> 
                    <div className = "center">
                        <h1 className = 'circleTeam' > <img className="imageSize"src='/assets/seanAbout.png' alt="sean"/></h1>
                        <h2>Sean</h2>
                        <h2>Website</h2>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Team;