import React, { useState, useRef, useEffect } from "react";

import { Select, InputNumber } from "antd";

import { getTokenIcon } from "@utils/getTokenIcon";

import './style.css';

const CurrencyLabel = (props) => {

    const { fromValue = 0, type, toValue = 0, fromList = [], toList = [], from = {}, to = {} } = props;
    const { handleChangeValue, onSelectToken } = props;

    const [state, setState] = useState({
        currIcon: '',
        currToken: '',
    });

    const inputRef = useRef(null);

    // get icon follow to token value
    const IconSuffix = getTokenIcon(type === 'fromValue' ? from?.label : to?.label);

    // auto focus from token input
    useEffect(() => {
        if (type !== 'fromValue') return;
        if (inputRef.current) inputRef.current.focus();
    },[]);

    // handle select token
    const onSelect = (value, option) => {
        state.currIcon = option.label;
        state.currToken = value;
        setState(prev => ({...prev}));
        onSelectToken(value, option, type);
    };

    // format to token input
    const handleFormatter = (value) => {
        if (type === 'fromValue') return value;
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className="currency-label">
            <div className="wrapper">
                <div className="left">
                    <InputNumber
                        ref={inputRef}
                        className="left-input"
                        readOnly={type === 'toValue'}
                        min={0}
                        step={0.5}
                        type={type === 'fromValue' ? 'number' : 'text'}
                        formatter={handleFormatter}
                        value={type === 'fromValue' ? fromValue : toValue}
                        onChange={(e) => handleChangeValue(e, type)}
                    />
                </div>
                <div className="right">
                    <Select
                        style={{
                            width: 140,
                        }}
                        showSearch
                        onSelect={onSelect}
                        value={type === 'fromValue' ? from?.label : to?.label}
                        suffixIcon={<IconSuffix />}
                        size="large"
                        className="select"
                        options={type === 'fromValue' ? fromList : toList}
                    />
                </div>
                {Object.keys(from).length > 0 && (
                    <div className="last-updated">
                        {`Last updated: ${new Date(from?.date || to?.date).toString().replace(/\sGMT[\+\-]\d{4}\s[\(\w\s]+\)/, '')}`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrencyLabel;