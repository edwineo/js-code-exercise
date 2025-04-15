import React, { useEffect, useState } from "react";

// LazyImage 组件
const LazyImage = ({ src, alt, placeholder }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadImage = () => {
    setIsLoaded(true);
  };

  // 使用 IntersectionObserver 来检测图片是否进入视口
  useEffect(() => {
    const imgElement = document.querySelector(`img[data-src='${src}']`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(imgElement);

    // 清理 observer
    return () => observer.disconnect();
  }, [src]);

  return (
    <div className="image-container">
      <img
        data-src={src}
        src={isLoaded ? src : placeholder}
        alt={alt}
        className="lazy-image"
        loading="lazy"
      />
    </div>
  );
};

export default LazyImage;
