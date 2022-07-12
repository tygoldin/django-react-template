import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useEffect, useState} from "react";
import axiosConfig from '../../api/axiosConfig.js'
import {color_palette} from "../../styles/colorPalette";
import {CheckBoxSelect} from "../material-ui/Select";

// example data format
const series = [
    {
        name: 'Series 1',
        data: [
            { date: 1643668202, value: Math.random() },
            { date: 1646087402, value: Math.random() },
            { date: 1648765802, value: Math.random() },
        ],
    },
    {
        name: 'Series 2',
        data: [
            { date: 1640989802, value: Math.random() },
            { date: 1643668202, value: Math.random() },
            { date: 1646087402, value: Math.random() },
        ],
    },
    {
        name: 'Series 3',
        data: [
            { date: 1638311402, value: Math.random() },
            { date: 1640989802, value: Math.random() },
            { date: 1643668202, value: Math.random() },
        ],
    },
];

// dated line chart with no selection options
export function FixedFieldsLineChart(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        const promises = [];
        for (const promise of props.promises) {
            promises.push(axiosConfig.get(promise.url, {params: promise.params}));
        }
        Promise.all(promises).then(function(values) {
            setData(values.map((response) => { return response.data}));
        });
    }, [props.promises])

    // tickItem: unix timestamp (s)
    function dateFormatter(tickItem){
        return new Date(tickItem*1000).toLocaleDateString()
    }

    return (
        <div style={{height: props.height, width: props.width}}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"
                           type="number"
                           domain={['dataMin', 'dataMax']}
                           tickFormatter={dateFormatter}
                           allowDuplicatedCategory={false}
                           interval="preserveEnd"/>
                    <YAxis dataKey="value" />
                    <Tooltip />
                    <Legend />
                    {data.map((s, index) => {
                        return <Line dataKey="value"
                                     data={s.data}
                                     name={s.name}
                                     key={s.name}
                                     stroke={color_palette[data.length][index]}
                                     strokeWidth={2}/>
                    })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export function FixedCategoricalLineChart() {

}

// dated line chart with multi selection
export function ModularFieldsLineChart(props) {

    const [selectedFields, setSelectedFields] = useState([]);

    const [fields, setFields] = useState([]);

    useEffect(() => {
        setFields(props.promises.map((promise) => { return promise.params['name']}));
    }, [props.promises])

    const selectedPromises = props.promises.filter((promise) => {
        if (selectedFields.includes(promise.params['name'])) {
            return promise
        }
    });


    return (
        <>
            <FixedFieldsLineChart promises={selectedPromises} height={props.height} width={props.width} />
            <CheckBoxSelect fields={fields} selectedFields={selectedFields} setSelectedFields={setSelectedFields} />
        </>
    )
}



export function ModularCategoricalLineChart() {

}