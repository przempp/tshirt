import React, { useState } from 'react';


function SidebarComponent() {
    const [sidebarClassname, setSidebarClassname] = useState('')

 return(
     <div>
         <div style={{zIndex: "1000"}} className='position-fixed'>
             <button onClick={event => {setSidebarClassname('enter')}} >testtesttesttesttesttesttesttest</button>
         </div>
     <div className={`sidebar ${sidebarClassname}`}>
         <div style={{filter: 'blur(2px)'}}>
            <div >
             <nav>
                 <button onClick={event => {setSidebarClassname('')}}>Hide</button>
                 <a href="#">Link</a>
                 <a href="#">Link</a>
                 <a href="#">Link</a>
                 <a href="#">Link</a>
                 <a href="#">Link</a>
             </nav>
         </div>
         </div>
     </div>
     </div>
 )
}

export default SidebarComponent