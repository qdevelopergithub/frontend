

import { IoAddCircleOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

interface iState {
  movie: never[]
}
const MovieList = (props: iState) => {
  console.log(props.movie)
  const navigate = useNavigate();
  const handlclick = () => {
    navigate('/addMovie')
  }

  const handleEdit = (item: React.DOMAttributes<HTMLDivElement>) => {

    navigate('/editMovie', { state: { item } })
  }

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate('/');
  }

  return (
    <div className="md:container md:mx-auto px-10">
      <div className="flex justify-between mt-[60px]">
        <div className="flex justify-start relative">
          <h2 className="">My movies </h2>
          <IoAddCircleOutline className="absolute w-[32px] h-[32px] top-4 left-[230px]" onClick={handlclick} />
        </div>
        <div className="w-[104px] h-[32px] flex cursor-pointer" onClick={handleLogout} >
          <p className="w-[60px] h-[24px] font-bold text-base leading-6">Logout</p>
          <div>
            <LuLogOut className='absolute top-16' />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2" >
      {props?.movie?.map((item: any, index: number) => (
          <div className="bg-[#092C39] text-left rounded-[12px] px-[8px] py-[16px]" key={index} onClick={() => handleEdit(item)}>
            <img
              className="h-[80%]"
              src={item.poster}
              alt={`Movie poster for ${item.title}`}
            />
            <div className="">
              <h4 className="!text-sm !font-medium !leading-8 w-[74px]">{item?.title}</h4>
              <p className=" leading-6 text-sm font-normal">{item?.publishingYear}</p>
            </div>
          </div>
      ))}
    </div >
      </div>
  )
}

export default MovieList
