import {FixedFieldsLineChart, ModularFieldsLineChart} from "../charts/LineChart";
import {TitleContainer} from "../charts/TitleContainer";
import '../../styles/LineChartExamples.css';

export function LineChartExamples() {
    return (
        <>
            <TitleContainer title="Random Chart">
                <FixedFieldsLineChart promises={[{url: '/random_date_data/', params: {name: 'series1'}},
                                                 {url: '/random_date_data/', params: {name: 'series2'}},
                                                 {url: '/random_date_data/', params: {name: 'series3'}},
                                                 {url: '/random_date_data/', params: {name: 'series4'}},
                                                 {url: '/random_date_data/', params: {name: 'series5'}}]}
                                      height="500px"
                                      width="700px"/>
            </TitleContainer>
            <TitleContainer title="Random Chart Select">
                <ModularFieldsLineChart promises={[{url: '/random_date_data/', params: {name: 'series1'}},
                                                   {url: '/random_date_data/', params: {name: 'series2'}},
                                                   {url: '/random_date_data/', params: {name: 'series3'}},
                                                   {url: '/random_date_data/', params: {name: 'series4'}},
                                                   {url: '/random_date_data/', params: {name: 'series5'}}]}
                                        height="500px"
                                        width="700px"/>
            </TitleContainer>
        </>
    )
}