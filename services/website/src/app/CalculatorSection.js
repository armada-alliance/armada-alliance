import React, { useEffect, useRef, useState, useContext } from "react";
import Slider from "react-slick";
import { css } from "@emotion/react";
import cx from "classnames";
import Text from "./Text";
import DualColorText from "./DualColorText";
import Context from "./Context";
import StakingRewardsCalculator from "./StakingRewardsCalculator";
import LivingOffRewardsCalculator from "./LivingOffRewardsCalculator";
import RewardsToRetireCalculator from "./RewardsToRetireCalculator";

function TabItem({
    divRef,
    onEnter: onClick,
    onLeave: onMouseLeave,
    title,
    active,
}) {
    return (
        <div
            ref={divRef}
            className={cx(
                "px-2 md:px-4 py-2 flex items-center cursor-pointer overflow-hidden"
            )}
            onClick={onClick}
            onMouseLeave={onMouseLeave}
        >
            <div
                className={cx(
                    "font-medium transition-colors text-xs md:text-base text-center truncate",
                    active ? "text-gray-800 dark:text-gray-200" : "text-gray-500"
                )}
            >
                {title}
            </div>
        </div>
    );
}

function TabItemGhost({ title, width, left }) {
    return (
        <div
            className={cx(
                "absolute top-0 bottom-0 flex items-center rounded-xl shadow bg-white dark:bg-gray-900"
            )}
            css={css`
        transition: 200ms ease width, 200ms ease left;
      `}
            style={{ width, left }}
        />
    );
}

export default function TabsSection(props) {


    const calculators = [
        { id: "StakingRewardsCalculator", title: "Staking rewards", description: "Enter total ADA you own and find out how much ADA you will earn per year, per month and per epoch", component: StakingRewardsCalculator },
        { id: "LivingOffRewardsCalculator", title: "Living off rewards", description: "Enter your ADA target Price, Income Goal, Staking APY and find out how much ADA you need to own", component: LivingOffRewardsCalculator },
        { id: "RewardsToRetireCalculator", title: "Rewards to retire", description: "Enter total ADA you own, your target income and find out what ADA price you could retire at", component: RewardsToRetireCalculator },
    ]

    const sliderRef = useRef(null)

    const { language } = useContext(Context)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [init, setInit] = useState(false);
    const [prevLanguage, setPrevLanguage] = useState(false);

    const featureRefs = calculators.map(() => useRef(null));

    useEffect(() => {
        if (!init || prevLanguage !== language) {
            setCurrentIndex(0); // force ghost tab item
            setInit(true);
            setPrevLanguage(language)
        }
    }, [language]);

    const handleBeforeChange = (oldIndex, newIndex) => {
        setCurrentIndex(newIndex)
    }

    const calculator = calculators[currentIndex];

    const settings = {
        dots: true,
        infinite: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-8 md:py-12 lg:py-20 select-none">
            <div className="lg:max-w-custom mx-auto">
                <div className="text-center">
                    <h2 className="leading-none mb-4 text-4xl lg:text-4xl font-extrabold dark:text-gray-100">
                        <DualColorText>Calculate your rewards</DualColorText>
                    </h2>
                </div>
                <div className="py-4 flex items-center justify-center">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-1 overflow-x-auto">
                        <div className="relative flex items-center">
                            {calculator ? (
                                <TabItemGhost
                                    title={<Text>{calculator.title}</Text>}
                                    width={
                                        featureRefs[currentIndex].current
                                            ? featureRefs[currentIndex].current.clientWidth
                                            : null
                                    }
                                    left={
                                        featureRefs[currentIndex].current
                                            ? featureRefs[currentIndex].current.offsetLeft
                                            : null
                                    }
                                />
                            ) : null}
                            <div className="relative flex items-center w-full">
                                {calculators.map((calculator, index) => {
                                    return (
                                        <TabItem
                                            key={index}
                                            divRef={featureRefs[index]}
                                            title={<Text>{calculator.title}</Text>}
                                            active={index === currentIndex}
                                            onEnter={() => {
                                                sliderRef.current.slickGoTo(index)
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden">
                    <div className="-mx-4">
                        <Slider {...settings} ref={sliderRef} beforeChange={handleBeforeChange}>
                            {calculators.map(calculator => {

                                return (
                                    <div key={calculator.id} className="focus:outline-none px-4">
                                        <div className="max-w-md md:max-w-3xl mx-auto py-4 md:py-8">
                                            <calculator.component description={calculator.description} />
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
}