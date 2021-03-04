import React from "react";

import {
    createStyles,
    makeStyles,
    withStyles,
    Theme,
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import styles from "./GroupMember.module.css";
import { KnowitColors } from "../../styles";

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "label + &": {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: "20px",
            position: "relative",
            backgroundColor: KnowitColors.beige,
            border: "1px solid #ced4da",
            fontSize: 16,
            fontWeight: "bold",
            padding: "10px 50px 10px 22px !important",
            transition: theme.transitions.create([
                "border-color",
                "box-shadow",
            ]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
            "&:focus": {
                borderRadius: "20px",
                borderColor: "#80bdff",
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
            },
        },
    })
)(InputBase);

const useNavStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    menuItem: {
    },
}));

const Nav = ({ categories, category, setCategory, name }: any) => {
    const classes = useNavStyles();

    return (
        <div className={styles.nav}>
            <FormControl className={classes.formControl}>
                <Select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    input={<BootstrapInput />}
                >
                    <MenuItem value="Oversikt" className={classes.menuItem}>
                        Oversikt
                    </MenuItem>
                    {categories.map((c: any) => (
                        <MenuItem
                            key={c}
                            value={c}
                            className={classes.menuItem}
                        >
                            {c}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <h1 className={styles.navName}>{name}</h1>
        </div>
    );
};

export default Nav;