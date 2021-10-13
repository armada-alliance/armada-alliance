import React, { useState, useCallback } from "react";
import { css } from "@emotion/react";
import Slider from "react-slick";
// import parseTitle from "./parseTitle";
import cx from "classnames";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import Carousel, { Modal, ModalGateway } from "react-images";
import formatImage from './formatImage'

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            style={{
                ...style,
                display: 'flex',
                marginRight: 16,
                zIndex: 1,
            }}
            className={cx(className, "flex items-center justify-center h-12 w-12 shadow-md bg-white dark:bg-gray-700 text-primary-500 hover:bg-white hover:text-primary-500 rounded-l-full md:rounded-full")}
            css={[
                css`
          &:before {
            content: "" !important;
          }
        `,
            ]}
            onClick={onClick}
        >
            <ArrowRightIcon className="h-5" />
        </div>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            style={{
                ...style,
                display: 'flex',
                zIndex: 1,
                marginLeft: 16,
            }}
            className={cx(className, "flex items-center justify-center h-12 w-12 shadow-md bg-white dark:bg-gray-700 text-primary-500 hover:bg-white hover:text-primary-500 rounded-r-full md:rounded-full")}
            css={[
                css`
          &:before {
            content: "" !important;
          }
        `,
            ]}
            onClick={onClick}
        >
            <ArrowLeftIcon className="h-5" />
        </div>
    );
}

export default function ImagesSection(props) {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const { alternate } = props

    const handleImageClick = useCallback((index) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: props.images.length >= 3 ? 3 : 2,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        appendDots: dots => {
            return (
                <ul>
                    {dots.map((dot, index) => {

                        return (
                            <li style={{ width: 6, height: 6, marginLeft: 12, marginRight: 12 }} className={cx("rounded-full", dot.props.className === "slick-active" ? "bg-gray-500 dark:bg-gray-200" : "bg-gray-200 dark:bg-gray-700")} />
                        )

                        // console.log('dot', dot)

                        return React.cloneElement(dot, {})
                    })}
                </ul>
            )
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    // console.log(settings)
    return (
        <>
            <div className={cx("select-none", alternate ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-900")}>
                <div className="max-w-7xl mx-auto">
                    {/* <h2 className="leading-none mb-4 text-4xl lg:text-4xl font-extrabold">
                    {title}
                </h2> */}
                    <div className="relative -ml-4 -mr-4 overflow-hidden">
                        <div className="pb-10 w-full">
                            <Slider {...settings}>
                                {props.images.map((image, index) => {
                                    return (
                                        <div
                                            onClick={() => handleImageClick(index)}
                                            className="relative w-full px-4 py-4"
                                            css={css`
                    outline: none;
                    cursor: pointer;
                  `}
                                        >
                                            <div className="rounded-lg shadow-md overflow-hidden absolute bg-gray-700 top-4 bottom-4 left-4 right-4">
                                                <div
                                                    style={{ backgroundImage: `url('${formatImage(image.url)}')` }}
                                                    className="bg-center bg-no-repeat bg-cover absolute top-0 bottom-0 left-0 right-0"
                                                />
                                            </div>
                                            <div style={{ paddingTop: "70%" }} />
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                        {/* <div className="hidden md:block absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-l from-transparent to-white" /> */}
                        {/* <div className="hidden md:block absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-r from-transparent to-white" /> */}
                    </div>
                </div>
            </div>
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={props.images.map(image => ({
                                source: formatImage(image.url)
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </>
    );
}