"use client"
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


export default function Page(){
    const [titleValue, setTitleValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    function addSection() {
        console.log(titleValue);
        if(titleValue.trim() === '') {
            setErrorMsg('The title can\'t be blank.');
        } else {
            setErrorMsg('');
        }
    }

    return(
        <div className="flex justify-center">
            <div className="w-1/2">
                <h1 style={{fontSize: 45, color: '#121212'}}> Create your project</h1>
                <p style={{color: '#4C4C4C', fontSize:20}} className="mb-10">Write the title of the sections you want to add.</p>
                <div id="sections"></div>
                <Textarea 
                    placeholder="Type your section title here." 
                    id="message" 
                    value={titleValue} 
                    onChange={(e) => setTitleValue(e.target.value)} 
                />
                <p id='Error' style={{color: 'red', fontWeight: 'bold'}}>{errorMsg}</p>
                <p style={{color: '#5D5D5D', fontSize: 13}}>Press enter or comma to add.</p>
                <Button onClick={addSection}>Create</Button> 
            </div>
        </div>
    )
}
