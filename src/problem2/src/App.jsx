import React, { useState, useEffect } from 'react';

import CurrencyLabel from '@components/CurrencyLabel';
import { message, Spin } from 'antd';

import { IconUpDown } from './assets';

import './App.css';

const App = ()  => {

    const [state, setState] = useState({
        fromValue: 0,
        toValue: 0,
        data: [],
        from: {},
        to: {},
        fromList: [],
        toList: [],
        classSlideFrom: '',
        classSlideTo: '',
        loading: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://interview.switcheo.com/prices.json');
                if (!response.ok) {
                    message.error("Network response was not ok");
                };

                const data = await response.json();
                const currencies = {};

                // filter duplicate currency
                const filteredData = data.reduce((token, item) => {
                    if (!currencies[item.currency]) {
                        currencies[item.currency] = true;
                        token.push(item);
                    }
                    return token;
                }, []);

                // add key to use in Select component
                const finalData = filteredData.map((item) => {
                    return {
                        ...item,
                        value: item?.currency + `${Math.random()}`,
                        label: item?.currency,
                    };
                });

                state.data = finalData;
                state.fromList = finalData;
                state.toList = finalData;
                state.loading = false,

                setState(prev => ({...prev}));
            } catch (error) {
                message.error(error);
            };
        };
        
        // simulate loading delay 800ms
        setTimeout(() => {
            fetchData();
        }, 800)
    }, []);

    // handle change value of input
    const handleChangeValue = (e, type) => {
        state[type] = e;
        setState(prev => ({...prev}));
    };

    // handle select token
    const onSelectToken = (value, option, type) => {
        if (type === 'fromValue') {
            const options = state.data?.filter((item) => {
                return item.value !== option?.value;
            });

            state.from = option;
            state.toList = options;
        } else {
            const options = state.data?.filter((item) => {
                return item.value !== option?.value;
            });

            state.to = option;
            state.fromList = options;
        };

        setState(prev => ({...prev}));
    };

    // handle when swap beetween 2 tokens
    const handleSwap = () => {
        if (Object.keys(state.from).length === 0 || Object.keys(state.to).length === 0) {
            message.warning("Choose token first!");
            return;
        };

        const { from, to, fromList, toList } = state;
        const newFrom = to;
        const newFromList = toList;
        const newTo = from;
        const newToList = fromList;

        // start animation
        setState(prev => ({...prev, classSlideFrom: 'slide-out-from', classSlideTo: 'slide-in-to'}));
        
        // swap value
        setTimeout(() => {
            setState(prev => ({...prev, from: newFrom, to: newTo, fromList: newFromList, toList: newToList}));
        }, 500);

        // end animation
        setTimeout(() => {
            setState(prev => ({...prev, classSlideFrom: '', classSlideTo: ''}));
        }, 600);
    };

    // calculate to token value
    useEffect(() => {
        if (Object.keys(state.from).length === 0 || Object.keys(state.to).length === 0) return;

        const conversionRate = (Number(state.to.price) / Number(state.from.price));
        const toValue = (Number(state.fromValue) * Number(conversionRate)) || 0;
        state.toValue = toValue > 0 ? toValue.toFixed(3) : toValue;
        setState(prev => ({...prev}));
    },[state.fromValue, state.to, state.from])

    return (
        <>
            {state.loading && (
                <div className='loading'>
                    <Spin size='large' tip='Loading...'>
                        <></>
                    </Spin>
                </div>
            )}
            {!state.loading && (
                <div className="container">
                    <div className='card'>
                        <div className='title'>Currency Swap</div>
                        <div className='currency-wrapper'>
                            <div className={`from-currency ${state.classSlideFrom}`}>
                                <CurrencyLabel
                                    type='fromValue'
                                    fromValue={state.fromValue}
                                    data={state.data}
                                    fromList={state.fromList}
                                    from={state.from}
                                    handleChangeValue={handleChangeValue}
                                    onSelectToken={onSelectToken}
                                />
                            </div>
                            <div
                                className='icon-swap'
                                onClick={handleSwap}
                            >
                                <IconUpDown />
                            </div>
                            <div className={`to-currency ${state.classSlideTo}`}>
                                <CurrencyLabel
                                    type='toValue'
                                    toValue={state.toValue}
                                    data={state.data}
                                    to={state.to}
                                    toList={state.toList}
                                    handleChangeValue={handleChangeValue}
                                    onSelectToken={onSelectToken}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;