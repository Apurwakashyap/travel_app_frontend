import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory, useFilter } from "../../context";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Categories.css";

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const { hotelCategory, setHotelCategory } = useCategory();
    const { filterDispatch } = useFilter();

    const handleFilterClick = () => {
        filterDispatch({
            type: "SHOW_FILTER_MODAL",
        });
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    "https://travel-app-backened.onrender.com/api/category"
                );
                setCategories(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleCategoryClick = (category) => {
        setHotelCategory(category);
    };

    // Carousel responsive settings
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 9,
            slidesToSlide: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
            slidesToSlide: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1,
        },
    };

    return (
        <section className="categories d-flex gap">
            <Carousel
                responsive={responsive}
                infinite={true}                // Loop the carousel
                keyBoardControl={true}         // Allow keyboard navigation
                containerClass="carousel-container"
                showDots={true}                // Enable pagination dots
                dotListClass="custom-dot-list" // Custom CSS for dots if needed
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {categories &&
                    categories.map(({ _id, category }) => (
                        <span
                            key={_id}
                            className={`${category === hotelCategory ? "category-color" : ""
                                } item`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </span>
                    ))}
            </Carousel>
            <div>
                <button
                    className="button btn-filter d-flex align-center gap-small cursor-pointer"
                    onClick={handleFilterClick}
                >
                    <span className="material-icons-outlined">filter_alt</span>
                    <span>Filter</span>
                </button>
            </div>
        </section>
    );
};
