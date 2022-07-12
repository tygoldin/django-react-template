import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {useEffect, useState} from "react";
import axiosConfig from "../../api/axiosConfig";
import {color_palette} from "../../styles/colorPalette";

export function FixedFieldsBarChart(props) {
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

    return (
        <div style={{height: props.height, width: props.width}}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category"
                           allowDuplicatedCategory={false}
                           interval="preserveEnd"/>
                    <YAxis dataKey="value" />
                    <Tooltip />
                    <Legend />
                    {data.map((s, index) => {
                        return <Bar dataKey="value"
                                    data={s.data}
                                    name={s.name}
                                    key={s.name}
                                    stroke={color_palette[data.length][index]}
                                    strokeWidth={2}/>
                    })}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}