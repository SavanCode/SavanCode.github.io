import React from 'react' 

//header
const Header=(props)=>(
     
    <div className="header">
        <div className="content">
                <h1 className="title1">{props.title}</h1>
                { props.subtitle && <h2 className="title2">{props.subtitle}</h2>}
        </div> 
    </div> 
)

Header.defaultProps={
        title:'Indecision App'
}

export default Header