import {ListTitle1} from "../components/pages/ListTitle1";
import {ListTitle1ListItem1} from "../components/pages/ListTitle1ListItem1";
import {ListTitle1ListItem2} from "../components/pages/ListTitle1ListItem2";
import {LineChartExamples} from "../components/pages/LineChartExamples";
import {Mapbox} from "../components/map/Mapbox";
// navigation mappings
export const navLinks = [
    {
        name: "List Title 1",
        url: "/list-title-1",
        children: [
            {
                name: "Main Page",
                url: "",
                element: <ListTitle1 />
            },
            {
                name: "List Item 1",
                url: "/list-item-1",
                element: <ListTitle1ListItem1 />
            },
            {
                name: "List Item 2",
                url: "/list-item-2",
                element: <ListTitle1ListItem2 />
            },
        ]
    },
    {
        name: "Charts",
        url: "/charts",
        children: [
            {
                name: "Main Page",
                url: "",
                element: <ListTitle1 />
            },
            {
                name: "Line Charts",
                url: "/line-charts",
                element: <LineChartExamples />
            },
        ]
    },
    {
        name: "Mapbox",
        url: "/mapbox",
        children: [
            {
                name: "Main Page",
                url: "",
                element: <Mapbox />
            },
        ]
    }

]
