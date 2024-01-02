import { useNavigate } from 'react-router-dom'

const EmptyState = () => {
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate('/addMovie')
    }
    return (
        <div className='relative top-40'>
            <h1 className='my-4'>Your movie list is empty</h1>
            <div>
                <button className="primary py-[16px] px-[28px] h-[43px]" onClick={handleClick}>Add a new movie</button>
            </div>
        </div>
    )
}

export default EmptyState
