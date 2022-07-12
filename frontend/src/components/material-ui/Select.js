import {useEffect} from "react";
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select} from "@mui/material";

export function CheckBoxSelect({fields, selectedFields, setSelectedFields}) {

    useEffect(() => {
        setSelectedFields(fields);
    }, [fields])


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedFields(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Fields</InputLabel>
            <Select
                multiple
                value={selectedFields}
                onChange={handleChange}
                input={<OutlinedInput label="Fields" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 48 * 4.5 + 8,
                            width: 250,
                        },
                    },
                }}>
                {fields.map((field) => (
                    <MenuItem key={field} value={field}>
                        <Checkbox checked={selectedFields.indexOf(field) > -1} />
                        <ListItemText primary={field} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}