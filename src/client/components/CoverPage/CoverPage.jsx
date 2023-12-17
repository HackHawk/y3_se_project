import Image from "next/image";
import DefaultImage from "/public/Default_book_image.png";

const CoverPage = ({ imageUrl }) => {
    const width = 120;
    const height = 200;

    return (
        <div className="cover-page">
            {imageUrl ? (
                <Image src={imageUrl} alt="Book Cover" className="cover-image" width={width} height={height} />
            ) : (
                <Image src={DefaultImage} alt="Default Book Cover" className="cover-image" width={width} height={height} />
            )}
        </div>
    );
};

export default CoverPage;
