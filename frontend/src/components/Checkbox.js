import React, { useState } from 'react';

export const Checkbox = ({ grocery }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isCrossed, setIsCrossed] = useState(false);

    function handleChange(event){
        /*CHECK MARKS ITEM*/
        setIsChecked(event.target.checked);
    }

    const handleKeyDown = (event) => {
        /*MARKS AND SLASHES ITEM*/
        if(event.key === "Enter" && event.target.checked){  /*PRESS ENTER KEY ON KEYBOARD FOR EPIC SURPRISE */
            setIsCrossed((isCrossed) => !isCrossed);
        }

        /*REMOVES ITEM*/
        if (event.key === "Escape" && event.target.checked){
            setIsVisible(false);
        }
    };

    if (isVisible)
        return ( 
            <div className={`item ${isCrossed ? "inputChecked" : ""}`}>
                <div className='inputContainer'>
                    <input 
                        tabIndex="-1"
                        type="checkbox" 
                        checked={isChecked} 
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                    />
                </div>
                <p>{grocery}</p> 
            </div>
        );
};

