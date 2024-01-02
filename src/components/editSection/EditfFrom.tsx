import axios from "axios";
import React ,{useEffect, useState }from "react";
import { MdOutlineFileDownload } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom";


const EditfFrom = () => {
    const location=useLocation();
    const item=location.state.item
    const Navigate = useNavigate();
    const token = localStorage.getItem('loginToken')

    const ref = React.useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState('');
    const [publishing, setPublishing] = useState('');
    const [icon, setIcon] = useState('');

    const MAX_FILE_SIZE_MB = 2; // Maximum file size allowed in MB

    useEffect(() => {
        if (item) {
            // If 'item' exists, update the form fields with its data
            setTitle(item.title || "");
            setPublishing(item.publishingYear || "");
            setIcon(item.poster||" ")
            // Additional fields can be updated similarly
        }
    }, [item]);
    
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
                console.error('File size exceeds the limit');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = async function (event) {
                if (event.target) {
                    const image = new Image();
                    image.src = event.target.result as string;
                    image.onload = function () {
                        const canvas = document.createElement('canvas');
                        const maxWidth = 800; // Maximum width for the resized image
                        const maxHeight = 600; // Maximum height for the resized image
                        let width = image.width;
                        let height = image.height;

                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx?.drawImage(image, 0, 0, width, height);
                        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // Adjust the quality as needed
                        setIcon(resizedDataUrl);
                    };
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleCancel = () => {
        Navigate('/home')
    }

    const handleSubmit = async () => {
        const updatedMovie = {
            title,
            publishingYear: parseInt(publishing),
            poster: icon
        };

        try {
            const response = await axios.put(`http://localhost:3000/movie/${item.id}`, updatedMovie, {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                Navigate('/home');
            } else {
                throw new Error('Failed to update movie');
            }
        } catch (error) {
            console.error('Error updating movie:', error);
            // Handle error state or display error message
        }
    };


    return (
        <div className="newMovieCard ">
            <h2>Edit</h2>
            <div className="flex justify-between relative gap-[9rem] rounded-[10px] mt-[60px] ">
                <div className="">
                    <input
                        type="file"
                        ref={ref}
                        className="hidden h-0"
                        name="icon"
                        onChange={handleChange}
                    />
                    <div
                        onClick={() => ref.current?.click()}
                        className="w-[473px] h-[504px] bg-[#224957] border-[2px] border-dashed border-[#FFFFFF] rounded-[10px] relative">
                         {icon ? (
                            <img src={icon} alt="Selected" className="w-full h-full object-cover rounded-[10px]" />
                        ) : (
                            <div className="absolute top-[210px] left-[10.5rem] text-center">
                                <MdOutlineFileDownload />
                                <p className="text-center flex"> Drag and drop an image </p>
                            </div>
                        )}

                    </div>
                </div>
                <div className="right-0 place-content-start">
                    <div>
                        <input placeholder="Title"
                        name="title"
                        className="px-1 w-[362px] h-[45px]"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        ></input><br /><br />
                    </div>
                    <div className="flex">
                        <input placeholder="Publishing year" className="px-1 w-[216px] h-[45px]"
                        name="publishing"
                        value={publishing}
                        onChange={(e) => setPublishing(e.target.value)}></input>
                    </div>
                    <div className="mt-20 flex gap-[5px]">
                        <button className="w-[160px] h-[50px]  py-[16px] px-[55px] rounded-[10px] border-[1px] gap-[5px]" onClick={handleCancel}>Cancel</button>
                        <button className="primary w-[170px] h-[50px]  rounded-[10px]  gap-[5px]" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditfFrom
