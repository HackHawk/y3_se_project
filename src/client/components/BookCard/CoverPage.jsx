import Image from 'next/image';
import DefaultImage from '/public/Default_book_image.png';

// Custom loader function
const customLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const CoverPage = ({ imageUrl }) => {
  const width = 120;
  const height = 200;

  return (
    <div className="cover-page">
      {imageUrl ? (
        <Image
          loader={customLoader}
          src={imageUrl}
          alt="Book Cover"
          className="cover-image justify-center"
          width={width}
          height={height}
          unoptimized={process.env.NODE_ENV !== 'production'} // Optionally, use unoptimized in non-production environments
        />
      ) : (
        <Image
          src={DefaultImage}
          alt="Default Book Cover"
          className="cover-image"
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default CoverPage;
