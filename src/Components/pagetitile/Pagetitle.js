import './Pagetitle.css';

function Pagetitle({ children }){
    return(
        <h4 className='pagetitle'>{children}</h4>
    )
}

export default Pagetitle;